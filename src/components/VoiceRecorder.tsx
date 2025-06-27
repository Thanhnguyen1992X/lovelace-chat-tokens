
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  isDisabled?: boolean;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription, isDisabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        // Clean up the stream
        stream.getTracks().forEach(track => track.stop());

        // For demo purposes, simulate transcription
        setTimeout(() => {
          onTranscription('This is a simulated transcription. Connect to a real speech-to-text service for actual transcription.');
        }, 1000);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording Stopped",
        description: "Processing your audio...",
      });
    }
  };

  const playAudio = () => {
    if (audioURL && !isPlaying) {
      const audio = new Audio(audioURL);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const clearRecording = () => {
    setAudioBlob(null);
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    setAudioURL('');
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {!isRecording && !audioBlob && (
        <Button
          variant="outline"
          size="icon"
          onClick={startRecording}
          disabled={isDisabled}
          className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <Mic className="w-4 h-4" />
        </Button>
      )}

      {isRecording && (
        <Button
          variant="outline"
          size="icon"
          onClick={stopRecording}
          className="border-red-600 text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
          <Square className="w-4 h-4" />
        </Button>
      )}

      {audioBlob && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={isPlaying ? pauseAudio : playAudio}
            className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearRecording}
            className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Clear
          </Button>
        </div>
      )}

      {isRecording && (
        <div className="flex items-center text-red-400 text-sm">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-2" />
          Recording...
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
