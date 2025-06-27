
-- Update user_profiles table to match your requirements
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS tokens_remaining INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS tokens_last_reset TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS subscription_tokens INTEGER DEFAULT 0;

-- Update the existing tokens column to tokens_remaining for consistency
UPDATE user_profiles SET tokens_remaining = COALESCE(tokens, 100) WHERE tokens_remaining IS NULL;

-- Enable RLS on chat_messages table (if not already enabled)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can insert their own messages" ON chat_messages;

-- Create RLS policies for chat_messages
CREATE POLICY "Users can view their own messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable RLS on user_profiles table (if not already enabled)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Function to reset daily tokens
CREATE OR REPLACE FUNCTION reset_daily_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_profiles
  SET tokens_remaining = 100,
      tokens_last_reset = NOW()
  WHERE tokens_last_reset < NOW() - INTERVAL '1 day'
    AND subscription_active = FALSE;
END;
$$;

-- Update the existing handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO user_profiles (id, tokens_remaining, tokens_last_reset, subscription_active)
  VALUES (NEW.id, 100, NOW(), FALSE)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup (drop if exists first)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
