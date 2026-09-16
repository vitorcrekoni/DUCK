import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  videoId?: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  videoId = 'nZOrhNlbFHc',
  isMuted,
  onToggleMute,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const playerRef = useRef<any>(null);
  const containerId = useRef(`yt-player-${Math.random().toString(36).substr(2, 9)}`);

  // Load YouTube Iframe API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(containerId.current, {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              // Handle initial mute state
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
              event.target.playVideo();
            },
            onStateChange: (event: any) => {
              // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Loop
                event.target.playVideo();
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [videoId]);

  // Sync mute state with YouTube player
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      try {
        if (isMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
          playerRef.current.setVolume(85);
          // If unmuted and wasn't playing due to browser autoplay policy, trigger play
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      } catch {
        // fallback postMessage if direct call fails
        postCommand(isMuted ? 'mute' : 'unMute');
      }
    }
  }, [isMuted, isPlayerReady]);

  const postCommand = (func: string, args: any[] = []) => {
    const iframe = document.getElementById(containerId.current) as HTMLIFrameElement | null;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args,
        }),
        '*'
      );
    }
  };

  const handleTogglePlay = () => {
    setHasInteracted(true);
    if (playerRef.current && isPlayerReady) {
      try {
        if (isPlaying) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          if (!isMuted) {
            playerRef.current.unMute();
          }
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
        return;
      } catch {
        // fallback below
      }
    }

    // Fallback if player instance not ready
    if (isPlaying) {
      postCommand('pauseVideo');
      setIsPlaying(false);
    } else {
      postCommand('playVideo');
      setIsPlaying(true);
    }
  };

  const handleMuteClick = () => {
    setHasInteracted(true);
    // If it was muted and we are unmuting, make sure the video is also playing
    if (isMuted && playerRef.current && isPlayerReady) {
      try {
        playerRef.current.unMute();
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch {
        // ignore
      }
    }
    onToggleMute();
  };

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090d16]/90 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
      {/* Hidden YouTube iframe */}
      <div className="sr-only opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
        <div id={containerId.current} />
      </div>

      {/* Mini Player Display & Play/Pause */}
      <button
        type="button"
        id="btn-music-play-pause"
        onClick={handleTogglePlay}
        title={isPlaying ? 'Pausar música' : 'Tocar música'}
        className="group flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 transition-all cursor-pointer"
      >
        <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
          {isPlaying ? (
            <Pause className="w-2.5 h-2.5 fill-current" />
          ) : (
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono leading-none">
          <span className="text-white font-medium">BGM</span>
          {/* Animated Equalizer Waves */}
          {isPlaying && !isMuted ? (
            <div className="flex items-end gap-0.5 h-3 px-0.5">
              <span className="w-0.5 bg-cyan-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2" />
              <span className="w-0.5 bg-cyan-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-emerald-400 rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-1.5" />
              <span className="w-0.5 bg-cyan-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-2.5" />
            </div>
          ) : (
            <span className="text-[10px] text-slate-500">
              {isMuted ? 'MUDO' : 'PAUSADO'}
            </span>
          )}
        </div>
      </button>

      {/* Botão de mutar o som alocado diretamente ao lado do player */}
      <button
        type="button"
        id="header-btn-sound"
        onClick={handleMuteClick}
        title={isMuted ? 'Desmutar áudio' : 'Mutar áudio'}
        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
          isMuted
            ? 'text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08]'
            : 'text-cyan-300 hover:text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
        }`}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-slate-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-cyan-400" />
        )}
      </button>
    </div>
  );
};
