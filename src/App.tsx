import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  LayoutGrid, 
  MessageSquare, 
  Settings, 
  Plus, 
  X, 
  ArrowRight, 
  History, 
  Bookmark, 
  Shield, 
  Cpu, 
  Globe,
  MoreVertical,
  ChevronRight,
  Zap,
  Folder as FolderIcon,
  FolderPlus,
  Trash2,
  Edit2,
  ChevronDown,
  Activity,
  Command,
  Layers,
  Monitor,
  EyeOff,
  Terminal,
  Download,
  CloudDownload,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  Palette,
  Type,
  ImageIcon,
  Highlighter,
  Waves,
  Sparkles,
  Cpu as CpuIcon,
  Settings as SettingsIcon,
  File as FileIcon,
  SearchCode,
  ZapOff,
  Video,
  VideoOff,
  Radio,
  Share2,
  Smartphone,
  Tablet,
  Clock,
  LogOut,
  User
} from 'lucide-react';
import { getAIInsight, chatWithAI } from './lib/gemini';
import { Favicon } from './components/Favicon';
import { auth, loginWithGoogle, logout, db } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { 
  Tab, 
  BookmarkItem, 
  Folder, 
  Workspace, 
  ChatMessage, 
  DownloadTask, 
  HistoryItem, 
  AppSettings, 
  SearchState, 
  TabGroup, 
  SearchResult,
  Device,
  SessionEvent,
  KernelUpdate
} from './types';

// --- Components ---

const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
  if (!highlight.trim()) return <>{text}</>;
  
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-vif-accent text-vif-bg px-0.5 rounded-sm animate-pulse shadow-[0_0_8px_var(--color-vif-accent)]">
            {part}
          </span>
        ) : part
      )}
    </>
  );
};

const EngineMonitor = () => {
  const [metrics, setMetrics] = useState({ cpu: 12, ram: 1.4, threads: 8, jit: 'Tier-2', engine: 'Chimera-S' });
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logPool = [
      "Neural Bridge: sector handshake [0x7A2] established",
      "Chimera Engine: JIT tier-2 optimization complete",
      "Memory Shield: garbage collection executed in 0.02ms",
      "P2P Network: synced with 1,242 regional nodes",
      "Secure Tunnel: TLS 1.4 certificate verified",
      "Kernel: high-priority patch detected in sector 4",
      "UI Mesh: layout regeneration successful",
      "AI Core: predictive model warmed for sector data",
      "History: neural recall buffer cleared",
      "Network: latency reduced to < 5ms via African edge nodes"
    ];

    const interval = setInterval(() => {
      const tiers = ['Tier-1', 'Tier-2', 'Tier-3', '4D-JIT'];
      const engines = ['Chimera-S', 'Chimera-B', 'Servo-V'];
      setMetrics({
        cpu: Math.floor(Math.random() * 15) + 5,
        ram: Number((1.1 + Math.random() * 0.3).toFixed(1)),
        threads: 12 + Math.floor(Math.random() * 4),
        jit: tiers[Math.floor(Math.random() * tiers.length)],
        engine: engines[Math.floor(Math.random() * engines.length)]
      });

      if (Math.random() > 0.7) {
        setLogs(prev => [...prev.slice(-4), logPool[Math.floor(Math.random() * logPool.length)]]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full bg-black/80 backdrop-blur-xl border-t border-white/5 p-5 space-y-6 relative group overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vif-accent/40 to-transparent" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-vif-accent/10 border border-vif-accent/20 rounded-full text-[10px] font-mono text-vif-accent uppercase font-black tracking-widest">
            <CpuIcon className="w-3 h-3 animate-pulse" />
            {metrics.engine}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-vif-muted uppercase tracking-widest">
            JIT STATUS: <span className="text-white font-bold">{metrics.jit}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 hidden sm:flex">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
             <span className="text-[10px] font-mono text-vif-muted uppercase tracking-tighter">System Health: Nominal</span>
          </div>
          <div className="text-[10px] font-mono text-vif-muted opacity-30 uppercase tracking-[0.2em] font-bold">Vif-Core v8.4.1 Ultimate Edition</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-mono text-vif-muted uppercase tracking-widest">
              <span>Core Matrix</span>
              <span className="text-vif-accent">{metrics.cpu}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${metrics.cpu}%` }} className="h-full bg-vif-accent shadow-[0_0_12px_var(--color-vif-accent)]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-mono text-vif-muted uppercase tracking-widest">
              <span>Mem Sector</span>
              <span className="text-vif-accent">{metrics.ram}GB</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${(metrics.ram / 4) * 100}%` }} className="h-full bg-vif-accent shadow-[0_0_12px_var(--color-vif-accent)]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-mono text-vif-muted uppercase tracking-widest">
              <span>Mesh Load</span>
              <span className="text-vif-accent">{metrics.threads}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${(metrics.threads / 24) * 100}%` }} className="h-full bg-vif-accent shadow-[0_0_12px_var(--color-vif-accent)]" />
            </div>
          </div>
        </div>

        <div className="h-12 bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-start overflow-hidden relative">
          <div className="absolute top-0 right-0 p-2 opacity-50"><Terminal className="w-3 h-3" /></div>
          <div ref={scrollRef} className="text-[9px] font-mono text-vif-muted uppercase tracking-tighter space-y-1 overflow-y-auto no-scrollbar scroll-smooth">
            {logs.length > 0 ? logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -5 }} 
                animate={{ opacity: 1 - (logs.length - 1 - i) * 0.2, x: 0 }} 
                key={i} 
                className="flex gap-2"
              >
                <span className="text-vif-accent opacity-50 tracking-normal">&gt;</span>
                {log}
              </motion.div>
            )) : <div className="opacity-20 animate-pulse">Initializing kernel console streams...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommandPalette = ({ isOpen, onClose, onCommand, history }: { 
  isOpen: boolean, 
  onClose: () => void,
  onCommand: (cmd: string, val?: string) => void,
  history: HistoryItem[]
}) => {
  const [query, setQuery] = useState('');
  
  const commands = [
    { id: 'new-tab', icon: Plus, label: 'New Tab', hotkey: '⌘T' },
    { id: 'bookmarks', icon: Bookmark, label: 'Search Bookmarks', hotkey: '⌘B' },
    { id: 'history', icon: History, label: 'Review Neural Recall', hotkey: '⌘H' },
    { id: 'downloads', icon: Download, label: 'Download Manager', hotkey: '⌘D' },
    { id: 'ai-chat', icon: MessageSquare, label: 'Open AI Assistant', hotkey: '⌘J' },
    { id: 'replay', icon: Video, label: 'Temporal Replay Mode', hotkey: '⌘R' },
    { id: 'find', icon: SearchCode, label: 'Find in Sector', hotkey: '⌘F' },
    { id: 'settings', icon: Settings, label: 'Browser Settings', hotkey: '⌘,' },
    { id: 'incognito', icon: EyeOff, label: 'Ghost Mode', hotkey: '⌘⇧N' },
  ];

  const filteredCommands = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
  const filteredHistory = history
    .filter(h => h.query.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-[#080808] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,255,0,0.1)] border border-white/10"
      >
        <div className="flex items-center gap-4 px-5 py-5 bg-white/5 border-b border-white/5">
          <Terminal className="w-5 h-5 text-vif-accent animate-pulse" />
          <input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Execute command or search recall..."
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-white/10 font-mono text-vif-accent"
          />
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-vif-accent/10 border border-vif-accent/20 rounded text-[9px] text-vif-accent font-mono">ESC</kbd>
          </div>
        </div>

        <div className="p-3 max-h-[450px] overflow-y-auto no-scrollbar">
          {filteredCommands.length > 0 && (
            <div className="mb-4">
              <div className="px-2 py-1.5 text-[10px] text-vif-muted uppercase tracking-[0.3em] font-black pb-3">Operational Directives</div>
              {filteredCommands.map(cmd => (
                <div 
                  key={cmd.id}
                  onClick={() => onCommand(cmd.id)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-vif-accent/10 group cursor-pointer transition-all border border-transparent hover:border-vif-accent/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-vif-accent/20 transition-all">
                      <cmd.icon className="w-4 h-4 text-vif-muted group-hover:text-vif-accent" />
                    </div>
                    <span className="text-sm font-medium tracking-tight">{cmd.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-vif-muted group-hover:text-vif-accent/50">{cmd.hotkey}</span>
                </div>
              ))}
            </div>
          )}

          {filteredHistory.length > 0 && (
            <div>
              <div className="px-2 py-1.5 text-[10px] text-vif-muted uppercase tracking-[0.3em] font-black pb-3">Recall Matches</div>
              {filteredHistory.map(h => (
                <div 
                  key={h.id}
                  onClick={() => onCommand('navigate', h.query)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 group cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <History className="w-3.5 h-3.5 text-vif-muted group-hover:text-vif-accent" />
                    <span className="text-xs text-vif-muted group-hover:text-white truncate max-w-[300px]">{h.query}</span>
                  </div>
                  <span className="text-[9px] font-mono text-white/5 uppercase">{h.type}</span>
                </div>
              ))}
            </div>
          )}

          {filteredCommands.length === 0 && filteredHistory.length === 0 && (
            <div className="p-12 text-center space-y-4">
              <EyeOff className="w-8 h-8 text-white/5 mx-auto" />
              <div className="text-vif-muted text-[10px] font-mono uppercase tracking-widest">Null selection found</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-5 py-3 bg-black/40 border-t border-white/5">
          <div className="flex items-center gap-5 text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 hover:text-vif-accent transition-colors"><div className="w-1 h-1 bg-white/20 rounded-full" /> Execute Event</span>
            <span className="flex items-center gap-2 hover:text-vif-accent transition-colors"><div className="w-1 h-1 bg-white/20 rounded-full" /> Traverse Nodes</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1 w-20 bg-white/5 rounded-full overflow-hidden">
               <motion.div animate={{ x: [-80, 80] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full w-8 bg-vif-accent/30" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
  
interface BookmarkCardProps {
  bookmark: BookmarkItem;
  folders: Folder[];
  onNavigate: (url: string) => void;
  onDelete: (id: string) => void;
  onMoveBookmark: (id: string, folderId: string | null) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ 
  bookmark, 
  folders, 
  onNavigate, 
  onDelete, 
  onMoveBookmark 
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all cursor-pointer"
  >
    <div 
      onClick={() => onNavigate(bookmark.url)}
      className="flex items-center gap-3 flex-1 min-w-0"
    >
      <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
        <Favicon src={bookmark.favicon} className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium truncate">{bookmark.title}</div>
        <div className="text-[9px] text-vif-muted truncate font-mono opacity-50">{bookmark.url}</div>
      </div>
    </div>
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <select 
        className="bg-vif-secondary text-[8px] border border-white/10 rounded px-1 py-0.5 outline-none focus:border-vif-accent"
        value={bookmark.folderId || ''}
        onChange={(e) => onMoveBookmark(bookmark.id, e.target.value || null)}
      >
        <option value="">No folder</option>
        {folders.map(f => (
          <option key={f.id} value={f.id}>{f.name}</option>
        ))}
      </select>
      <button 
        onClick={() => onDelete(bookmark.id)}
        className="p-1 hover:bg-red-500/10 hover:text-red-400 rounded transition-all"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  </motion.div>
);

const ReplayOverlay = ({ 
  isRecording, 
  isPlaying, 
  onToggleRecording, 
  onStopPlayback,
  duration 
}: { 
  isRecording: boolean, 
  isPlaying: boolean, 
  onToggleRecording: () => void, 
  onStopPlayback: () => void,
  duration: number
}) => {
  if (!isRecording && !isPlaying) return null;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-vif-secondary/80 backdrop-blur-xl border border-white/10 p-2 px-4 rounded-2xl shadow-2xl"
    >
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-vif-accent'}`} />
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
            {isRecording ? 'Temporal Recording' : 'Neural Replay'}
          </span>
          <span className="text-[9px] font-mono text-vif-muted">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')} / SEC_01
          </span>
        </div>
      </div>
      <div className="h-6 w-[1px] bg-white/10" />
      <div className="flex items-center gap-2">
        {isRecording ? (
          <button 
            onClick={onToggleRecording}
            className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors group"
          >
            <VideoOff className="w-4 h-4 group-hover:scale-110" />
          </button>
        ) : (
          <button 
            onClick={onStopPlayback}
            className="p-2 hover:bg-white/10 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const MirrorPanel = ({ 
  isOpen, 
  onClose, 
  devices, 
  onMirror 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  devices: Device[], 
  onMirror: (deviceId: string) => void 
}) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 glass z-[80] border border-white/10 rounded-3xl shadow-2xl p-6 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-vif-accent animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-widest">Neural Link</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-vif-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-mono text-vif-muted uppercase tracking-wider">Nearby Nodes</p>
          {devices.map(device => (
            <button 
              key={device.id}
              onClick={() => onMirror(device.id)}
              className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-vif-accent/10 hover:border-vif-accent/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-xl group-hover:text-vif-accent transition-colors">
                  {device.type === 'mobile' ? <Smartphone className="w-5 h-5" /> : 
                   device.type === 'tablet' ? <Tablet className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">{device.name}</div>
                  <div className="text-[9px] font-mono text-vif-muted uppercase tracking-tighter">
                    {device.status} • Sector 7G
                  </div>
                </div>
              </div>
              <Share2 className="w-4 h-4 text-vif-muted group-hover:text-vif-accent transition-colors" />
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-[9px] font-mono text-vif-muted italic text-center">
            P2P Neural Mirroring uses encrypted ultra-wideband sync.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SettingsPanel = ({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdate 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  settings: AppSettings,
  onUpdate: (updates: any) => void
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'system' | 'security'>('visual');
  const accentColors = ['#00FF00', '#007AFF', '#FF2D55', '#AF52DE', '#FF9500', '#5AC8FA', '#FFD600'];
  const fonts = [
    { value: 'sans', label: 'Inter' },
    { value: 'mono', label: 'JetBrains' },
    { value: 'serif', label: 'Editorial' }
  ];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-full w-[400px] glass z-[70] flex flex-col shadow-2xl border-l border-white/10"
    >
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-vif-secondary/50">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-5 h-5 text-vif-accent" />
          <h2 className="font-black text-xs tracking-[0.3em] uppercase">Kernel Configuration</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-vif-muted">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex border-b border-white/10 bg-black/20">
        {(['visual', 'system', 'security'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-[9px] font-mono uppercase tracking-widest transition-all ${
              activeTab === tab ? 'text-vif-accent border-b border-vif-accent bg-vif-accent/5' : 'text-vif-muted hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
        {activeTab === 'visual' && (
          <>
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-mono text-vif-muted uppercase tracking-widest border-b border-white/5 pb-2">
                <Palette className="w-3 h-3 text-vif-accent" /> Visual Signature
              </div>
              <div className="grid grid-cols-4 gap-4">
                {accentColors.map(color => (
                  <button 
                    key={color} 
                    onClick={() => onUpdate({ theme: { ...settings.theme, accentColor: color } })}
                    className={`w-full aspect-square rounded-2xl transition-all border-2 relative group overflow-hidden ${
                      settings.theme.accentColor === color ? 'border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-mono text-vif-muted uppercase tracking-widest border-b border-white/5 pb-2">
                <Type className="w-3 h-3 text-vif-accent" /> Neural Font
              </div>
              <div className="grid grid-cols-1 gap-2">
                {fonts.map(font => (
                  <button 
                    key={font.value} 
                    onClick={() => onUpdate({ theme: { ...settings.theme, fontFamily: font.value as any } })}
                    className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      settings.theme.fontFamily === font.value ? 'bg-vif-accent/10 border-vif-accent/50 text-vif-accent' : 'bg-white/5 border-white/10 text-vif-muted hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs font-bold tracking-tight">{font.label}</span>
                    {settings.theme.fontFamily === font.value && <CheckCircle className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-mono text-vif-muted uppercase tracking-widest border-b border-white/5 pb-2">
                <ImageIcon className="w-3 h-3 text-vif-accent" /> Opacity Matrix
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-mono uppercase text-vif-muted tracking-widest">
                    <span>Alpha Channel</span>
                    <span className="text-vif-accent">{Math.round(settings.theme.transparency * 100)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1" 
                    step="0.05"
                    value={settings.theme.transparency}
                    onChange={(e) => onUpdate({ theme: { ...settings.theme, transparency: parseFloat(e.target.value) } })}
                    className="w-full accent-vif-accent h-1.5 rounded-full cursor-pointer bg-white/10"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'system' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="p-5 bg-vif-accent/5 border border-vif-accent/20 rounded-[24px] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-vif-accent/10 rounded-xl">
                  <CpuIcon className="w-5 h-5 text-vif-accent" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-white">VIF Kernel Pro</div>
                  <div className="text-[9px] font-mono text-vif-accent">v{settings.system.version} (Stable Build)</div>
                </div>
              </div>
              <div className="space-y-1 text-[9px] font-mono text-vif-muted leading-relaxed">
                <div>Patch Level: {settings.system.patchLevel}</div>
                <div>Sector Isolation: ACTIVE</div>
                <div>Neural Proxy: ENABLED (2ms Latency)</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-mono text-vif-muted uppercase tracking-widest border-b border-white/5 pb-2">
                <Terminal className="w-3 h-3 text-vif-accent" /> System Directives
              </div>
              <div className="space-y-3">
                 <button className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all text-xs font-bold text-white uppercase tracking-widest">
                   Clear Neural Recall
                   <Trash2 className="w-4 h-4 text-red-400" />
                 </button>
                 <button className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all text-xs font-bold text-white uppercase tracking-widest">
                   Reset Kernel Defaults
                   <Zap className="w-4 h-4 text-vif-accent" />
                 </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-[24px] space-y-2">
              <Shield className="w-8 h-8 text-red-500 mb-2" />
              <div className="text-xs font-black uppercase text-white">Zero-Knowledge Protocols</div>
              <p className="text-[9px] text-vif-muted font-mono leading-relaxed uppercase tracking-tighter">
                All data is encrypted via military-grade post-quantum algorithms. 
                VIF does not store un-hashed neural patterns.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <EyeOff className="w-4 h-4 text-vif-muted group-hover:text-red-400 transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-widest">Ghost Sector Mode</span>
                </div>
                <div className="w-10 h-5 bg-white/10 rounded-full p-1 flex justify-start">
                  <div className="w-3 h-3 bg-white/20 rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 text-vif-muted group-hover:text-vif-accent transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-widest">Neural Link Encryption</span>
                </div>
                <div className="w-10 h-5 bg-vif-accent/50 rounded-full p-1 flex justify-end">
                  <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_8px_white]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 border-t border-white/10 bg-black/40">
        <div className="text-[9px] text-vif-muted font-mono uppercase tracking-[0.2em] leading-relaxed italic opacity-40">
          Neural State Hash: 0x{Math.random().toString(16).substring(2, 10).toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
};

const FindInPage = ({ 
  state, 
  onUpdate,
  onClose
}: { 
  state: SearchState, 
  onUpdate: (updates: Partial<SearchState>) => void,
  onClose: () => void
}) => {
  if (!state.isActive) return null;

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-12 right-6 z-50 flex items-center gap-2 bg-vif-secondary border border-white/10 rounded-xl p-2 shadow-2xl"
    >
      <div className="flex items-center gap-2 bg-vif-bg border border-white/10 rounded-lg px-3 py-1.5 min-w-[200px]">
        <SearchCode className="w-3.5 h-3.5 text-vif-accent" />
        <input 
          autoFocus
          value={state.query}
          onChange={(e) => onUpdate({ query: e.target.value })}
          placeholder="Filter page tokens..."
          className="bg-transparent border-none outline-none text-[10px] font-mono text-white flex-1"
        />
        <div className="text-[9px] font-mono text-vif-muted ml-2">
          {state.totalResults > 0 ? `${state.currentIndex + 1}/${state.totalResults}` : '0 results'}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onUpdate({ currentIndex: (state.currentIndex - 1 + state.totalResults) % (state.totalResults || 1) })}
          className="p-1.5 hover:bg-white/5 rounded-lg text-vif-muted"
        >
          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
        </button>
        <button 
          onClick={() => onUpdate({ currentIndex: (state.currentIndex + 1) % (state.totalResults || 1) })}
          className="p-1.5 hover:bg-white/5 rounded-lg text-vif-muted"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <div className="w-[1px] h-4 bg-white/10 mx-1" />
        <button onClick={onClose} className="p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-vif-muted">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

const DownloadsPanel = ({ 
  isOpen, 
  onClose, 
  downloads,
  onCancel,
  onPause,
  onResume
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  downloads: DownloadTask[],
  onCancel: (id: string) => void,
  onPause: (id: string) => void,
  onResume: (id: string) => void
}) => {
  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 left-0 h-full w-80 glass z-50 flex flex-col shadow-2xl border-r border-white/10"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-vif-secondary/50">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-vif-accent" />
          <h2 className="font-semibold text-sm tracking-tight">Downloads</h2>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-vif-muted">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {downloads.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-4 pt-20">
            <CloudDownload className="w-12 h-12 text-vif-accent" />
            <div className="text-[10px] font-mono tracking-widest uppercase">No active streams</div>
          </div>
        ) : (
          downloads.map(task => (
            <motion.div 
              key={task.id}
              layout
              className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-3 relative overflow-hidden"
            >
              {task.isP2P && (
                <div className="absolute top-0 right-0 p-1.5 px-2 bg-vif-accent/20 text-[8px] font-mono text-vif-accent uppercase font-black tracking-widest rounded-bl-lg">
                  P2P Stream
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{task.filename}</div>
                  <div className="text-[9px] text-vif-muted font-mono truncate">{task.url}</div>
                </div>
                {task.status === 'completed' || task.status === 'seeding' ? (
                  <CheckCircle className="w-4 h-4 text-vif-accent/70 shrink-0" />
                ) : task.status === 'failed' ? (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-vif-accent/20 border-t-vif-accent animate-spin shrink-0" />
                )}
              </div>

              {task.isP2P && task.status !== 'completed' && task.status !== 'failed' && (
                <div className="grid grid-cols-2 gap-2 pb-1">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-[7px] text-vif-muted uppercase font-mono">Swarm Peers</div>
                    <div className="text-[10px] font-mono text-vif-accent flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5" /> {task.peers} nodes
                    </div>
                  </div>
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-[7px] text-vif-muted uppercase font-mono">Mesh Speed</div>
                    <div className="text-[10px] font-mono text-white flex items-center gap-1">
                      <Waves className="w-2.5 h-2.5 text-vif-muted" /> {task.downloadSpeed}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-mono uppercase tracking-tighter">
                  <span className={task.status === 'downloading' || task.status === 'seeding' ? 'text-vif-accent' : 'text-vif-muted'}>
                    {task.status}
                  </span>
                  <span className="text-vif-muted">{task.progress}% of {task.size}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    className={`h-full ${task.status === 'completed' || task.status === 'seeding' ? 'bg-vif-accent/50' : task.status === 'failed' ? 'bg-red-500/50' : 'bg-vif-accent'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                {task.isP2P && task.status === 'completed' && (
                  <button className="flex-1 p-1 bg-vif-accent/10 border border-vif-accent/20 rounded text-[9px] font-mono text-vif-accent uppercase">
                    Keep Seeding
                  </button>
                )}
                {task.status === 'downloading' && (
                  <button 
                    onClick={() => onPause(task.id)}
                    className="p-1 px-2 bg-white/5 hover:bg-white/10 rounded flex items-center gap-1.5 text-[9px] font-mono text-vif-muted uppercase transition-colors"
                  >
                    <Pause className="w-3 h-3" /> Pause
                  </button>
                )}
                {task.status === 'paused' && (
                  <button 
                    onClick={() => onResume(task.id)}
                    className="p-1 px-2 bg-vif-accent/10 hover:bg-vif-accent/20 rounded flex items-center gap-1.5 text-[9px] font-mono text-vif-accent uppercase transition-colors"
                  >
                    <Play className="w-3 h-3" /> Resume
                  </button>
                )}
                <button 
                  onClick={() => onCancel(task.id)}
                  className="p-1 px-2 hover:bg-red-500/10 rounded flex items-center gap-1.5 text-[9px] font-mono text-red-400/70 uppercase transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> {task.status === 'completed' || task.status === 'seeding' ? 'Clear' : 'Cancel'}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-vif-secondary/30">
        <div className="text-[10px] text-vif-muted font-mono uppercase tracking-widest text-center">
          {downloads.filter(d => d.status === 'downloading').length} active transfers
        </div>
      </div>
    </motion.div>
  );
};

const HistoryPanel = ({ 
  isOpen, 
  onClose, 
  history,
  onClear,
  onNavigate
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  history: HistoryItem[],
  onClear: () => void,
  onNavigate: (url: string) => void
}) => {
  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 left-0 h-full w-80 glass z-[60] flex flex-col shadow-2xl border-r border-white/10"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-vif-secondary/50">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-vif-accent" />
          <h2 className="font-semibold text-sm tracking-tight uppercase">Neural Recall</h2>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={onClear}
            className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
            title="Wipe Recall Data"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-vif-muted">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar technical-grid">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-4 pt-20">
            <History className="w-12 h-12 text-vif-accent" />
            <div className="text-[10px] font-mono tracking-widest uppercase">No history entries</div>
          </div>
        ) : (
          [...history].sort((a, b) => b.timestamp - a.timestamp).map(item => (
            <motion.div 
              key={item.id}
              layout
              onClick={() => onNavigate(item.query.startsWith('http') ? item.query : `https://www.google.com/search?q=${encodeURIComponent(item.query)}`)}
              className="group p-3 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-vif-accent/5 flex items-center justify-center shrink-0">
                  {item.type === 'search' ? <Search className="w-3.5 h-3.5 text-vif-accent" /> : <Globe className="w-3.5 h-3.5 text-vif-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate group-hover:text-vif-accent transition-colors">{item.query}</div>
                  <div className="text-[8px] text-vif-muted font-mono uppercase">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    <span className="mx-1.5 opacity-30">|</span>
                    {item.type}
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-vif-accent opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-black/20">
        <div className="text-[9px] text-vif-muted font-mono uppercase tracking-[0.2em] text-center">
          Vif Recall Subsystem Active
        </div>
      </div>
    </motion.div>
  );
};

const BookmarksPanel = ({ 
  isOpen, 
  onClose, 
  bookmarks, 
  folders,
  onDelete, 
  onNavigate,
  onCreateFolder,
  onDeleteFolder,
  onRenameFolder,
  onMoveBookmark
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  bookmarks: BookmarkItem[],
  folders: Folder[],
  onDelete: (id: string) => void,
  onNavigate: (url: string) => void,
  onCreateFolder: (name: string) => void,
  onDeleteFolder: (id: string) => void,
  onRenameFolder: (id: string, name: string) => void,
  onMoveBookmark: (bookmarkId: string, folderId: string | null) => void
}) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  const startEditing = (folder: Folder) => {
    setEditingFolderId(folder.id);
    setEditName(folder.name);
  };

  const saveRename = () => {
    if (editingFolderId && editName.trim()) {
      onRenameFolder(editingFolderId, editName.trim());
      setEditingFolderId(null);
    }
  };

  const bookmarksByFolder = (folderId: string | null) => 
    bookmarks.filter(b => b.folderId === folderId);

  return (
    <motion.div 
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? 0 : '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 left-0 h-full w-80 glass z-50 flex flex-col shadow-2xl border-r border-white/10"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-vif-secondary/50">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-vif-accent" />
          <h2 className="font-semibold text-sm tracking-tight">Bookmarks</h2>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsCreatingFolder(!isCreatingFolder)} 
            className={`p-1.5 rounded-lg transition-colors ${isCreatingFolder ? 'bg-vif-accent text-vif-bg' : 'hover:bg-white/10 text-vif-muted'}`}
          >
            <FolderPlus className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-vif-muted">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {isCreatingFolder && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-vif-accent/5 border border-vif-accent/20 rounded-xl space-y-3"
          >
            <div className="text-[10px] uppercase tracking-widest text-vif-accent font-bold">New Folder</div>
            <div className="flex gap-2">
              <input 
                autoFocus
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                placeholder="Folder name..."
                className="flex-1 bg-vif-bg border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-vif-accent"
              />
              <button 
                onClick={handleCreateFolder}
                className="bg-vif-accent text-vif-bg p-1.5 rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {folders.map(folder => (
            <div key={folder.id} className="space-y-1">
              <div className="group flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors">
                <button 
                  onClick={() => toggleFolder(folder.id)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedFolders.includes(folder.id) ? '' : '-rotate-90'}`} />
                </button>
                <FolderIcon className="w-4 h-4 text-vif-accent/70" />
                
                {editingFolderId === folder.id ? (
                  <input 
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={saveRename}
                    onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                    className="flex-1 bg-transparent border-none outline-none text-xs font-medium"
                  />
                ) : (
                  <span className="flex-1 text-xs font-medium truncate">{folder.name}</span>
                )}

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEditing(folder)} className="p-1 hover:bg-white/10 rounded">
                    <Edit2 className="w-3 h-3 text-vif-muted" />
                  </button>
                  <button onClick={() => onDeleteFolder(folder.id)} className="p-1 hover:bg-red-500/10 rounded">
                    <Trash2 className="w-3 h-3 text-red-400 opacity-70" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {expandedFolders.includes(folder.id) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-6 space-y-1 border-l border-white/5 ml-4"
                  >
                    {bookmarksByFolder(folder.id).length === 0 ? (
                      <div className="py-2 text-[10px] text-vif-muted italic opacity-50">Empty folder</div>
                    ) : (
                      bookmarksByFolder(folder.id).map(b => (
                        <BookmarkCard 
                          key={b.id} 
                          bookmark={b} 
                          folders={folders}
                          onNavigate={onNavigate}
                          onDelete={onDelete}
                          onMoveBookmark={onMoveBookmark}
                        />
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="space-y-1 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 px-2 py-1 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-vif-muted">Uncategorized</span>
            </div>
            {bookmarksByFolder(null).length === 0 && folders.length > 0 ? null : (
              bookmarksByFolder(null).map(b => (
                <BookmarkCard 
                  key={b.id} 
                  bookmark={b} 
                  folders={folders}
                  onNavigate={onNavigate}
                  onDelete={onDelete}
                  onMoveBookmark={onMoveBookmark}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-vif-secondary/30">
        <div className="text-[10px] text-vif-muted font-mono uppercase tracking-widest text-center">
          {bookmarks.length} nodes · {folders.length} paths
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = ({ 
  activeTab, 
  onTabClick, 
  tabs, 
  groups,
  onNewTab, 
  onToggleGroupCollapse,
  onRenameGroup,
  onCreateGroup,
  onRemoveGroup,
  onMoveTabToGroup,
  onCloseTab
}: { 
  activeTab: Tab | undefined, 
  onTabClick: (id: string) => void,
  tabs: Tab[],
  groups: TabGroup[],
  onNewTab: () => void,
  onToggleGroupCollapse: (id: string) => void,
  onRenameGroup: (id: string, name: string) => void,
  onCreateGroup: () => void,
  onRemoveGroup: (id: string) => void,
  onMoveTabToGroup: (tabId: string, groupId?: string) => void,
  onCloseTab: (id: string, e?: React.MouseEvent) => void
}) => {
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEditing = (g: TabGroup) => {
    setEditingGroupId(g.id);
    setEditName(g.name);
  };

  const saveRename = () => {
    if (editingGroupId && editName.trim()) {
      onRenameGroup(editingGroupId, editName.trim());
      setEditingGroupId(null);
    }
  };

  const visibleTabs = tabs.filter(t => {
    if (!t.groupId) return true;
    const group = groups.find(g => g.id === t.groupId);
    return !group?.isCollapsed;
  });

  return (
    <div className="h-12 flex items-center bg-vif-secondary/50 border-b border-white/5 px-2 gap-1 overflow-hidden relative">
      <div className="absolute inset-0 scan-line opacity-20 pointer-events-none" />
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 relative z-10">
        {/* Un-grouped tabs that come before any groups could be complex, 
            so let's render groups first, then un-grouped tabs */}
        
        {groups.map(group => (
          <div key={group.id} className="flex items-center gap-1 mr-1">
            <motion.div 
              layout
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all cursor-pointer group ${
                group.isCollapsed ? 'opacity-50' : 'bg-white/5 border-white/10'
              }`}
              style={{ borderColor: group.color + '44' }}
              onClick={() => onToggleGroupCollapse(group.id)}
              onDoubleClick={() => startEditing(group)}
            >
              <div 
                className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" 
                style={{ backgroundColor: group.color, color: group.color }} 
              />
              {editingGroupId === group.id ? (
                <input 
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={saveRename}
                  onKeyDown={(e) => e.key === 'Enter' && saveRename()}
                  className="bg-transparent border-none outline-none text-[10px] font-mono text-white w-20"
                />
              ) : (
                <span className="text-[10px] font-mono font-black uppercase tracking-tighter text-white/80">
                  {group.name}
                </span>
              )}
              {group.isCollapsed && <span className="text-[9px] font-mono text-vif-muted">({tabs.filter(t => t.groupId === group.id).length})</span>}
              <button 
                onClick={(e) => { e.stopPropagation(); onRemoveGroup(group.id); }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </motion.div>
            
            <AnimatePresence>
              {!group.isCollapsed && tabs.filter(t => t.groupId === group.id).map(tab => (
                <motion.div
                  key={tab.id}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  layoutId={tab.id}
                  onClick={() => onTabClick(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all min-w-[120px] max-w-[200px] whitespace-nowrap group relative border-t-2 ${
                    tab.isActive ? 'bg-vif-bg border border-white/10 text-white' : 'text-vif-muted hover:bg-white/5'
                  }`}
                  style={{ borderTopColor: group.color }}
                >
                  <Favicon src={tab.favicon} className="w-3.5 h-3.5 opacity-80" />
                  <span className="text-xs font-medium truncate flex-1 tracking-tight">{tab.title}</span>
                  <X 
                    onClick={(e) => onCloseTab(tab.id, e)}
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 hover:text-red-400" 
                  />
                  <div className="absolute -top-1 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onMoveTabToGroup(tab.id, undefined); }}
                      className="bg-vif-secondary px-1 text-[8px] rounded border border-white/10 hover:text-vif-accent"
                    >
                      Ungroup
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}

        {tabs.filter(t => !t.groupId).map((tab) => (
          <motion.div
            key={tab.id}
            layoutId={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all min-w-[120px] max-w-[200px] whitespace-nowrap group relative ${
              tab.isActive ? 'bg-vif-bg border border-white/10 text-white' : 'text-vif-muted hover:bg-white/5'
            }`}
          >
            <Favicon src={tab.favicon} className="w-3.5 h-3.5 opacity-80" />
            <span className="text-xs font-medium truncate flex-1 tracking-tight">{tab.title}</span>
            <X 
              onClick={(e) => onCloseTab(tab.id, e)}
              className="w-3 h-3 opacity-0 group-hover:opacity-100 hover:text-red-400" 
            />
            
            {/* Grouping Action */}
            <div className="absolute -top-1 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 gap-1">
              {groups.length > 0 ? (
                <select 
                  className="bg-vif-secondary px-1 text-[8px] rounded border border-white/10 outline-none"
                  onChange={(e) => onMoveTabToGroup(tab.id, e.target.value)}
                  value=""
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="" disabled>Group...</option>
                  {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              ) : (
                <button 
                  onClick={(e) => { e.stopPropagation(); onCreateGroup(); onMoveTabToGroup(tab.id, 'new'); }}
                  className="bg-vif-secondary px-1 text-[8px] rounded border border-white/10 hover:text-vif-accent"
                >
                  New Cluster
                </button>
              )}
            </div>
          </motion.div>
        ))}
        
        <button 
          onClick={onNewTab}
          className="p-1.5 hover:bg-white/5 rounded-lg text-vif-muted transition-colors ml-1"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button 
          onClick={onCreateGroup}
          className="p-1.5 hover:bg-white/5 rounded-lg text-vif-muted transition-colors opacity-30 hover:opacity-100"
          title="New Neural Cluster"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 px-4 border-l border-white/5 ml-2 relative z-10">
        <Shield className="w-4 h-4 text-vif-accent" />
        <div className="text-[10px] font-mono text-vif-accent opacity-80 uppercase tracking-widest hidden sm:block">Protected</div>
      </div>
    </div>
  );
};

const URLBar = ({ url, isBookmarked, onBookmark, onVisit, onFind, onMirror }: { url: string, isBookmarked: boolean, onBookmark: () => void, onVisit: (val: string) => void, onFind: () => void, onMirror: () => void }) => {
  const [input, setInput] = useState(url);

  useEffect(() => {
    setInput(url === 'vif://dashboard' ? '' : url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onVisit(input.trim());
    }
  };

  return (
    <div className="h-10 flex items-center bg-vif-bg px-4 gap-4 sticky top-0 z-10 border-b border-white/5 shadow-sm">
      <div className="flex items-center gap-4 text-vif-muted">
        <div className="flex items-center gap-2">
           <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors"><ChevronRight className="w-4 h-4 rotate-180" /></button>
           <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <Globe className="w-4 h-4" />
      </div>
      <form onSubmit={handleSubmit} className="flex-1 bg-vif-secondary/50 flex items-center px-4 py-1.5 rounded-lg border border-white/5 focus-within:border-vif-accent/30 transition-all shadow-inner">
        <span className="text-vif-accent text-[10px] font-mono mr-2 opacity-30">SSL</span>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter sector URL or coordinate..."
          className="bg-transparent border-none outline-none text-[11px] text-white flex-1 font-mono tracking-tight placeholder:text-white/5"
        />
        <Shield className="w-3.5 h-3.5 text-vif-accent opacity-50 ml-2" />
      </form>
      <div className="flex items-center gap-3 text-vif-muted">
        <button onClick={onBookmark} className="p-1.5 hover:text-white transition-colors">
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-vif-accent text-vif-accent' : ''}`} />
        </button>
        <button 
          onClick={onMirror}
          className="p-1.5 hover:text-white transition-colors group"
          title="Neural Mirroring"
        >
          <Share2 className="w-4 h-4 group-hover:text-vif-accent transition-colors" />
        </button>
        <button onClick={onFind} className="p-1.5 hover:text-white transition-colors">
          <SearchCode className="w-4 h-4" />
        </button>
        <button 
          onClick={() => window.open(url, '_blank')}
          className="p-1.5 hover:text-white transition-colors group"
          title="Neural Breakout (Open in New Tab)"
        >
          <ExternalLink className="w-4 h-4 group-hover:text-vif-accent transition-colors" />
        </button>
        <button className="p-1.5 hover:text-white transition-colors group">
          <Zap className="w-4 h-4 group-hover:text-vif-accent transition-colors" />
        </button>
        <button className="p-1.5 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

const SecurityCenter = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setScanning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return p + 1;
      });
    }, 30);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-vif-accent/20 rounded-[40px] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,255,0,0.1)] relative"
          >
            <div className="p-8 border-b border-white/5 bg-vif-accent/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-vif-accent/10 rounded-2xl">
                  <Shield className="w-6 h-6 text-vif-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-white leading-none">Security Command</h2>
                  <p className="text-[10px] font-mono text-vif-accent/60 uppercase tracking-widest mt-2">Post-Quantum Neural Shield</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl text-vif-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 space-y-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-vif-muted uppercase tracking-[0.2em]">
                    <Activity className="w-3 h-3 text-vif-accent" /> Firewall Status
                  </div>
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Active Guard</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_green]" />
                     </div>
                     <div className="text-[9px] font-mono text-vif-muted leading-relaxed uppercase">
                        Monitoring 128 encrypted sector packets per microsecond.
                     </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-vif-muted uppercase tracking-[0.2em]">
                    <Shield className="w-3 h-3 text-vif-accent" /> Neural Proxy
                  </div>
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Double Hop</span>
                        <div className="w-2 h-2 bg-vif-accent rounded-full shadow-[0_0_10px_var(--color-vif-accent)]" />
                     </div>
                     <div className="text-[9px] font-mono text-vif-muted leading-relaxed uppercase">
                        Current routing through Sector-01 (Lagos Hub) & Sector-04 (Nairobi).
                     </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-vif-muted uppercase tracking-[0.2em]">Deep Sector Analysis</div>
                  <div className="text-xs font-black text-vif-accent">{progress}%</div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-vif-accent shadow-[0_0_20px_rgba(0,255,0,0.4)]" />
                </div>
                <button 
                  onClick={startScan}
                  disabled={scanning}
                  className="w-full py-5 bg-vif-accent text-vif-bg rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(0,255,0,0.1)] disabled:opacity-50"
                >
                  {scanning ? 'Analyzing Neural Patterns...' : 'Execute Deep Scan'}
                </button>
              </div>
            </div>
            
            <div className="p-6 bg-black flex justify-center">
               <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">ZKP-SHA384 VERIFIED SESSION</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const BookmarksManager = ({ 
  isOpen, 
  onClose, 
  bookmarks, 
  folders, 
  onDelete, 
  onNavigate 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  bookmarks: BookmarkItem[], 
  folders: Folder[], 
  onDelete: (id: string) => void, 
  onNavigate: (url: string) => void 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="fixed inset-0 z-[150] bg-vif-bg flex flex-col"
        >
          <div className="h-24 bg-black border-b border-white/5 flex items-center justify-between px-10">
            <div className="flex items-center gap-6">
              <VifLogo className="w-10 h-10 text-vif-accent" />
              <div className="h-8 w-[1px] bg-white/10" />
              <h1 className="text-2xl font-black uppercase tracking-tight text-white leading-none">Neural Repository Manager</h1>
            </div>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-vif-accent text-vif-bg rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,0,0.2)]"
            >
              Exit Terminal
            </button>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            <div className="w-80 border-r border-white/5 bg-black/20 p-8 space-y-10">
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-vif-muted uppercase tracking-[0.3em] px-2 italic font-bold">Categories</div>
                <div className="space-y-2">
                   <div className="p-4 bg-vif-accent/10 border border-vif-accent/20 rounded-2xl text-vif-accent text-xs font-black uppercase tracking-widest flex items-center gap-3 cursor-pointer">
                     <Bookmark className="w-4 h-4" /> All Sectors
                   </div>
                   {folders.map(f => (
                     <div key={f.id} className="p-4 hover:bg-white/5 rounded-2xl text-vif-muted text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 cursor-pointer transition-all">
                       <FolderIcon className="w-4 h-4 opacity-40" /> {f.name}
                     </div>
                   ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar p-12 technical-grid">
              <div className="max-w-6xl mx-auto space-y-16">
                <div className="flex items-end justify-between border-b-2 border-vif-accent pb-6">
                  <div className="space-y-2">
                    <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic">Root Index</h2>
                    <p className="text-vif-accent font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Registered Nodes: {bookmarks.length} identified sectors</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                  {bookmarks.map(b => (
                    <motion.div 
                      key={b.id}
                      whileHover={{ y: -5, borderColor: 'var(--color-vif-accent)' }}
                      className="p-8 bg-black/40 border border-white/5 rounded-[40px] group transition-all relative overflow-hidden glass"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <button onClick={() => onDelete(b.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="space-y-8 relative z-10">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center p-3 group-hover:border-vif-accent/40 group-hover:bg-vif-accent/5 transition-all">
                          {b.favicon ? <img src={b.favicon} alt="" className="w-full h-full object-contain" /> : <Globe className="w-8 h-8 text-vif-muted" />}
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-black text-white group-hover:text-vif-accent transition-colors uppercase leading-tight line-clamp-1">{b.title}</h3>
                          <p className="text-[9px] font-mono text-vif-muted truncate opacity-40 uppercase tracking-widest">{b.url}</p>
                        </div>
                        <button 
                          onClick={() => onNavigate(b.url)}
                          className="w-full py-4 bg-white/5 border border-white/10 hover:bg-vif-accent group-hover:shadow-[0_0_30px_rgba(0,255,0,0.3)] hover:text-vif-bg rounded-[20px] text-xs font-black uppercase tracking-widest transition-all"
                        >
                          Establish Link
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoginOverlay = ({ onLogin, loading }: { onLogin: () => void, loading: boolean }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-vif-bg flex items-center justify-center p-6 technical-grid overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.05)_0%,transparent_70%)]" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg bg-[#0a0a0a] border border-vif-accent/20 rounded-[40px] p-12 relative overflow-hidden shadow-[0_0_100px_rgba(0,255,0,0.1)]"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
           <VifLogo className="w-32 h-32 text-vif-accent" />
        </div>

        <div className="space-y-12 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-vif-accent rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-vif-accent uppercase tracking-[0.4em] font-bold">Terminal Access Required</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">Initialize<br/>Link</h1>
            <p className="text-vif-muted text-xs font-mono uppercase tracking-widest leading-relaxed opacity-60">
              Neural signature verification required to access Sector 07-G networks.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              disabled={loading}
              className="w-full py-6 bg-vif-accent text-vif-bg rounded-[24px] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(0,255,0,0.2)] disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <Activity className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Globe className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                  Establish Neural Connection
                </>
              )}
            </button>
            <div className="text-center">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Auth Provider: Google Cloud Security</span>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
            <div className="space-y-2">
               <div className="text-[9px] font-mono text-vif-accent uppercase tracking-widest">Protocol</div>
               <div className="text-[10px] font-mono text-white font-bold">OAUTH-2.0 / SHA384</div>
            </div>
            <div className="space-y-2 text-right">
               <div className="text-[9px] font-mono text-vif-accent uppercase tracking-widest">Zone</div>
               <div className="text-[10px] font-mono text-white font-bold">SECTOR-LAGOS-01</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Matrix Elements */}
      <div className="absolute top-10 left-10 text-vif-accent/10 font-mono text-[8px] space-y-1">
        <div>&gt; AUTH_INIT: 0x7FA2</div>
        <div>&gt; HANDSHAKE: PENDING</div>
        <div>&gt; SYNC_MESH: ACTIVE</div>
      </div>
    </div>
  );
};

const AIAssistant = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = messages.concat(userMsg).map(m => ({ role: m.role, content: m.content }));
    const response = await chatWithAI(context);
    
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-full w-80 glass z-50 flex flex-col shadow-2xl"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-vif-secondary/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-vif-accent rounded-full animate-pulse" />
          <h2 className="font-semibold text-xs tracking-widest uppercase">Neural Core</h2>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar technical-grid">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-6">
            <Terminal className="w-10 h-10 text-vif-accent" />
            <div className="text-[10px] font-mono tracking-widest uppercase">Awaiting instruction...</div>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
              m.role === 'user' ? 'bg-vif-accent text-vif-bg font-bold shadow-lg shadow-vif-accent/10' : 'bg-black/60 border border-white/5 font-mono'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-black/60 border border-white/5 rounded-xl px-4 py-2 flex gap-1.5 items-center">
              <span className="text-[9px] font-mono text-vif-muted mr-2">Processing</span>
              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-vif-accent rounded-full" />
              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-vif-accent rounded-full" />
              <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-vif-accent rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-vif-secondary/80">
        <div className="bg-vif-bg/50 rounded-xl p-2 flex items-center gap-2 border border-white/5 focus-within:border-vif-accent/30 transition-all">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query Vif Neural..." 
            className="bg-transparent border-none outline-none flex-1 text-xs px-3 font-mono"
          />
          <button onClick={handleSend} className="p-2.5 bg-vif-accent rounded-lg text-vif-bg hover:scale-105 active:scale-95 transition-all shadow-inner">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const VifLogo = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 80M80 20L20 80" stroke={color} strokeWidth="12" strokeLinecap="round" />
    <circle cx="50" cy="50" r="15" fill={color} className="animate-pulse" />
    <path d="M50 10V30M50 70V90M10 50H30M70 50H90" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.5" />
  </svg>
);

interface SearchResultItemProps {
  result: SearchResult;
  findHighlight: string;
  onOpenInternal: (url: string, title: string) => void;
}

const ControlButton = ({ icon: Icon, onClick, disabled = false, active = false, label, className = '' }: { icon: any, onClick: () => void, disabled?: boolean, active?: boolean, label?: string, className?: string }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    title={label}
    className={`p-2 rounded-xl transition-all duration-300 relative group ${className} ${
      disabled ? 'opacity-20 cursor-not-allowed' : 
      active ? 'bg-vif-accent text-vif-bg shadow-[0_0_15px_rgba(0,255,0,0.4)]' : 
      'hover:bg-white/5 text-vif-muted hover:text-white'
    }`}
  >
    <Icon className={`w-4 h-4 transition-transform ${!disabled && 'group-hover:scale-110 active:scale-95'}`} />
    {!disabled && label && (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/90 border border-white/10 rounded text-[8px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        {label}
      </div>
    )}
  </button>
);

const SearchResultItem: React.FC<SearchResultItemProps> = ({ result, findHighlight, onOpenInternal }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={() => onOpenInternal(result.url, result.title)}
    className="group space-y-1.5 p-4 rounded-2xl hover:bg-white/[0.02] transition-all border border-transparent hover:border-vif-accent/10 cursor-pointer relative"
  >
    <div className="flex items-center justify-between pb-1">
      <div className="flex items-center gap-2 text-[10px] font-mono text-vif-muted uppercase tracking-tighter opacity-60">
        <Globe className="w-3 h-3" />
        <span>{result.url}</span>
      </div>
      <div className="flex items-center gap-2 text-[8px] font-mono text-vif-accent opacity-0 group-hover:opacity-100 transition-opacity">
        <Zap className="w-2.5 h-2.5" />
        <span>SECURE HANDSHAKE</span>
      </div>
    </div>
    <h3 className="text-lg font-bold text-vif-accent group-hover:text-white tracking-tight flex items-center gap-2">
      <HighlightText text={result.title} highlight={findHighlight} />
      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
    </h3>
    <p className="text-xs text-white/50 leading-relaxed max-w-2xl font-mono group-hover:text-white/70 transition-colors">
      <HighlightText text={result.snippet} highlight={findHighlight} />
    </p>
  </motion.div>
);

const SystemUpdateOverlay: React.FC<{ 
  update: KernelUpdate, 
  onInstall: () => void, 
  onCancel: () => void 
}> = ({ update, onInstall, onCancel }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-vif-bg/80 backdrop-blur-2xl"
  >
    <div className="max-w-md w-full space-y-8 bg-black/40 border border-vif-accent/20 p-10 rounded-[32px] technical-grid relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4">
        <div className="w-2 h-2 bg-vif-accent rounded-full animate-ping" />
      </div>
      
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-vif-accent/5 rounded-2xl flex items-center justify-center border border-vif-accent/30 animate-pulse">
            <CpuIcon className="w-8 h-8 text-vif-accent" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Kernel Patch v{update.version}</h2>
          <p className="text-[10px] font-mono text-vif-muted uppercase tracking-[0.3em]">Neural Bridge Synchronization</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
          <p className="text-[9px] font-mono text-vif-accent uppercase font-bold">Changelog Extraction:</p>
          <ul className="space-y-1.5">
            {update.changelog.map((item, i) => (
              <li key={i} className="text-[10px] font-mono text-white/60 flex items-start gap-2">
                <span className="text-vif-accent mt-1">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between text-[9px] font-mono text-vif-muted uppercase tracking-widest px-1">
          <span>Package Size: {update.size}</span>
          <span className={update.isPriority ? "text-vif-accent" : ""}>Priority: {update.isPriority ? "CRITICAL" : "STANDARD"}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onCancel}
          className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all font-mono"
        >
          Decline
        </button>
        <button 
          onClick={onInstall}
          className="flex-[2] py-4 bg-vif-accent text-vif-bg rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(0,255,0,0.2)]"
        >
          Synchronize Core
        </button>
      </div>
    </div>
  </motion.div>
);

const Pagination: React.FC<{ totalPages: number, currentPage: number, onPageChange: (p: number) => void }> = ({ totalPages, currentPage, onPageChange }) => {
  const getVifLogo = (count: number) => {
    return (
      <span className="flex items-center text-3xl font-black tracking-tighter">
        <span className="text-white">V</span>
        {[...Array(count)].map((_, i) => (
          <span key={i} className={i + 1 === currentPage ? 'text-vif-accent' : 'text-vif-accent/30'}>i</span>
        ))}
        <span className="text-white">f</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center py-20 space-y-6">
      {getVifLogo(totalPages)}
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-8 h-8 rounded-lg font-mono text-[10px] transition-all flex items-center justify-center border ${
              currentPage === i + 1 
                ? 'bg-vif-accent text-vif-bg border-vif-accent font-bold scale-110 shadow-lg shadow-vif-accent/20' 
                : 'bg-white/5 border-white/10 text-vif-muted hover:bg-vif-accent/10 hover:border-vif-accent/30'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

const StartPage: React.FC<{ 
  onSearch: (val: string) => void, 
  onStartDownload: () => void, 
  findHighlight: string, 
  onOpenInternal: (url: string, title: string) => void,
  canGoBack: boolean,
  canGoForward: boolean,
  onNavigateBack: () => void,
  onNavigateForward: () => void,
  onRefresh: () => void
}> = ({ 
  onSearch, 
  onStartDownload, 
  findHighlight, 
  onOpenInternal,
  canGoBack,
  canGoForward,
  onNavigateBack,
  onNavigateForward,
  onRefresh
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const totalPages = 8;

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    onSearch(query.trim());
    
    const [insight] = await Promise.all([
      getAIInsight(query),
      new Promise(resolve => setTimeout(resolve, 800))
    ]);

    setAiInsight(insight);
    
    const mockResults: SearchResult[] = [
      { title: `${query} | Official Terminal Portal`, url: `https://vif.tech/sector/${query.toLowerCase().replace(/\s+/g, '-')}`, snippet: `Primary node for ${query} operations. Access encrypted documents, system logs, and neural configurations for the optimized VIF environment.` },
      { title: `Decentralized ${query} Mesh Protocols`, url: `vif://protocol/mesh/${query.toLowerCase()}`, snippet: `Comprehensive overview of how ${query} integrates with the Chimera P2P engine. Learn about latency management and sector-based rendering.` },
      { title: `Vab & Idris: ${query} Core Integration`, url: `https://intel.vif.africa/docs/${query.toLowerCase()}`, snippet: `Technical documentation for vab&idris tech africa. Exploration of ${query} dynamics within the Neural Gateway and AI Assistant frameworks.` },
      { title: `The History of ${query} in African Tech Ecosystems`, url: `https://archive.africa/tech/${query.toLowerCase()}`, snippet: `Tracing the origins of ${query} from early VIF prototypes to the current V8.4.1 Kernel. Key contributions by the Vab & Idris team.` },
    ];
    
    setResults(mockResults);
    setLoading(false);
    setCurrentPage(1);
  };

  const bookmarks = [
    { name: 'Linear', url: 'linear.app', icon: 'https://linear.app/favicon.ico' },
    { name: 'GitHub', url: 'github.com', icon: 'https://github.com/favicon.ico' },
    { name: 'Stripe', url: 'stripe.com', icon: 'https://stripe.com/favicon.ico' },
    { name: 'Vercel', url: 'vercel.com', icon: 'https://vercel.com/favicon.ico' },
    { name: 'Docker', url: 'docker.com', icon: 'https://www.docker.com/favicon.ico' },
    { name: 'Gemini', url: 'gemini.google.com', icon: 'https://www.gstatic.com/lamda/images/favicon_v2_16x16.png' },
  ];

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col items-center technical-grid py-20 px-6">
      <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/5 bg-black/20 flex items-center justify-between pointer-events-auto backdrop-blur-md z-40">
        <div className="flex items-center gap-2">
          <ControlButton icon={History} onClick={onNavigateBack} disabled={!canGoBack} label="Navigate Back" />
          <ControlButton icon={History} onClick={onNavigateForward} className="rotate-180" disabled={!canGoForward} label="Navigate Forward" />
          <ControlButton icon={Waves} onClick={onRefresh} label="Refresh Neural Sync" />
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-vif-muted uppercase tracking-widest hidden md:flex">
             <Shield className="w-3 h-3 text-vif-accent" /> Secure Sector 07-G
           </div>
           <div className="flex items-center gap-2">
             <ControlButton icon={Download} onClick={() => {}} label="Transfers" />
             <ControlButton icon={Settings} onClick={() => setIsSettingsOpen(true)} label="Configuration" />
           </div>
        </div>
      </div>

      <div className="absolute top-20 right-0 p-8 flex flex-col items-end gap-1 opacity-40 select-none pointer-events-none">
        <div className="text-[10px] font-mono tracking-[0.3em] text-vif-muted uppercase">Terminal Link: ESTABLISHED</div>
        <div className="text-[10px] font-mono tracking-[0.3em] text-vif-accent uppercase">Secure Sector: 01-PRO</div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl space-y-20 relative z-10"
      >
        <div className="text-center space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="w-24 h-24 relative group">
              <VifLogo className="w-full h-full text-white relative z-10 group-hover:text-vif-accent transition-colors duration-500" />
              <div className="absolute inset-0 bg-vif-accent/10 blur-[60px] rounded-full scale-150 opacity-20 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h1 className="text-7xl font-black tracking-tighter text-white">
                VIF<span className="text-vif-accent/50">_</span>CORE
              </h1>
              <div className="flex items-center justify-center gap-4 text-vif-muted font-mono text-[9px] tracking-[0.4em] uppercase font-bold">
                <span>Neural Gateway</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>African Tech Hub</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-12">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-vif-accent/20 to-transparent blur-xl rounded-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 group-focus-within:text-vif-accent transition-colors" />
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Sector or Prompt Engine..." 
              className="w-full h-24 bg-black/40 border border-white/5 rounded-[32px] pl-20 pr-36 outline-none focus:border-vif-accent/40 focus:bg-black/60 transition-all text-2xl glass font-mono placeholder:text-white/10 shadow-2xl"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-4 bg-vif-accent text-vif-bg font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50"
              >
                {loading ? <div className="w-4 h-4 border-2 border-vif-bg border-t-transparent rounded-full animate-spin" /> : <Zap className="w-4 h-4" />}
                {loading ? 'Decrypting' : 'Execute'}
              </button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {aiInsight && !loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-vif-accent/5 border border-vif-accent/10 rounded-[32px] p-8 relative overflow-hidden group shadow-2xl backdrop-blur-3xl"
              >
                <div className="absolute inset-0 scan-line opacity-5 pointer-events-none" />
                <div className="flex items-start gap-8 relative z-10">
                  <div className="p-4 bg-vif-accent/10 border border-vif-accent/20 rounded-2xl">
                    <Sparkles className="w-7 h-7 text-vif-accent" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between border-b border-vif-accent/10 pb-2">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-vif-accent font-black">Neural Core Synthesis</div>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 bg-vif-accent rounded-full animate-pulse" />
                         <div className="text-[9px] font-mono text-vif-muted">Confidence: 99.8%</div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80 font-mono italic">
                      <HighlightText text={aiInsight} highlight={findHighlight} />
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {results.length > 0 && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <div className="text-[10px] font-mono text-vif-muted uppercase tracking-[0.3em] pb-3 border-b border-white/5 flex justify-between items-center">
                    <div className="flex gap-6">
                      <span>Index: Sector {currentPage}</span>
                      <span className="opacity-50">Match Density: 0.12s • 2.4k Nodes</span>
                    </div>
                    <button 
                      onClick={() => onOpenInternal(`https://www.google.com/search?q=${encodeURIComponent(query)}`, `Google: ${query}`)}
                      className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-vif-muted hover:text-vif-accent hover:border-vif-accent/20 transition-all font-bold text-[9px] uppercase tracking-widest"
                    >
                      <ExternalLink className="w-3 h-3" /> External Bridge
                    </button>
                  </div>
                  <div className="space-y-3">
                    {results.map((r, i) => (
                      <SearchResultItem key={`${r.url}-${i}`} result={r} findHighlight={findHighlight} onOpenInternal={onOpenInternal} />
                    ))}
                  </div>
                </div>
                
                <Pagination 
                  totalPages={totalPages} 
                  currentPage={currentPage} 
                  onPageChange={(p) => {
                    setCurrentPage(p);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }} 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-6 gap-6 pt-4">
            {bookmarks.map((b) => (
              <motion.a 
                key={b.name}
                href={`https://${b.url}`}
                whileHover={{ y: -6, backgroundColor: 'rgba(255,255,255,0.03)' }}
                className="flex flex-col items-center gap-4 p-4 rounded-3xl transition-all group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-[22px] flex items-center justify-center border border-white/5 group-hover:border-vif-accent/20 transition-all overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Favicon src={b.icon} className="w-7 h-7 filter contrast-125 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>
                <span className="text-[10px] font-mono font-bold text-vif-muted tracking-widest uppercase group-hover:text-white transition-colors">
                  <HighlightText text={b.name} highlight={findHighlight} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-10 right-10 flex flex-col gap-10">
        <div className="flex justify-between items-end border-t border-white/5 pt-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-vif-accent/10 border border-vif-accent/20 rounded font-mono text-[9px] text-vif-accent font-bold uppercase tracking-widest animate-pulse">
                Engine Stable
              </div>
            </div>
            <div className="space-y-1">
               <div className="text-[9px] text-vif-muted font-mono tracking-widest uppercase">System Kernel: 8.4.1-VIF</div>
               <div className="text-[9px] text-white/20 font-mono tracking-widest uppercase">Encryption: AES-256 Enabled</div>
            </div>
          </div>
          <div className="flex gap-10 items-end">
            <button 
              onClick={onStartDownload}
              className="flex items-center gap-2 px-4 py-2 bg-vif-accent/5 hover:bg-vif-accent/10 border border-vif-accent/10 rounded-lg text-[10px] font-mono text-vif-accent uppercase tracking-widest transition-all group"
            >
              <CloudDownload className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Request Patch
            </button>
            <div className="flex gap-10 text-[9px] text-vif-muted font-mono tracking-widest uppercase items-center">
              <div className="flex flex-col items-end">
                <span className="text-white/40">Network Load</span>
                <span className="text-vif-accent">4.2 Gbps</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white/40">Privacy Tier</span>
                <span className="text-vif-accent">Military</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-[9px] font-mono text-vif-muted/30 uppercase tracking-[0.4em] pb-4">
          <span>Neural Gateway v8.4.1</span>
          <span>vif by vab&idris tech africa all rit</span>
          <span>Terminal ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [settings, setSettings] = useState<AppSettings>({
    theme: {
      accentColor: '#00FF00',
      backgroundImage: '',
      fontFamily: 'sans',
      transparency: 0.9,
      brightness: 1
    },
    search: {
      findInPage: false,
      lastQuery: ''
    },
    system: {
      version: '8.4.1',
      patchLevel: 104,
      lastUpdate: Date.now() - 172800000,
      isUpdating: false
    }
  });

  const [pendingUpdate, setPendingUpdate] = useState<KernelUpdate | null>(null);

  const [searchState, setSearchState] = useState<SearchState>({
    isActive: false,
    query: '',
    currentIndex: 0,
    totalResults: 0
  });

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: '1', name: 'Neural Link', type: 'production', tabs: [
      { id: 'start', title: 'Neural Dashboard', url: 'vif://dashboard', favicon: '/favicon.ico', isActive: true },
      { id: 'gh', title: 'vabidriss2/vif', url: 'https://github.com/vabidriss2', favicon: 'https://github.com/favicon.ico', isActive: false },
    ], groups: [] },
    { id: '2', name: 'Intelligence', type: 'research', tabs: [
      { id: 'start-r', title: 'Deep Analysis', url: 'vif://dashboard', favicon: '/favicon.ico', isActive: true },
    ], groups: [] },
  ]);
  
  const [activeWorkspaceId, setActiveWorkspaceId] = useState('1');
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      setIsLoggingIn(false);

      if (currentUser) {
        // Sync user profile to Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            userId: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          });
        } else {
          await setDoc(userRef, {
            lastLogin: new Date().toISOString()
          }, { merge: true });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setIsLoggingIn(false);
      if (err.code === 'auth/popup-closed-by-user') {
        console.log("Login popup closed by user");
      } else {
        console.error("Login failed", err);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  const [folders, setFolders] = useState<Folder[]>([]);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [fullBookmarksOpen, setFullBookmarksOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [downloads, setDownloads] = useState<DownloadTask[]>([]);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedEvents, setRecordedEvents] = useState<SessionEvent[]>([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mirrorPanelOpen, setMirrorPanelOpen] = useState(false);
  const [devices] = useState<Device[]>([
    { id: 'mb-1', name: 'Neural Phone Pro', type: 'mobile', status: 'online', lastSeen: Date.now() },
    { id: 'tb-1', name: 'Vab Prime Pad', type: 'tablet', status: 'online', lastSeen: Date.now() },
    { id: 'dk-1', name: 'Idris Station', type: 'desktop', status: 'offline', lastSeen: Date.now() - 3600000 },
  ]);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId)!;
  const activeTab = activeWorkspace.tabs.find(t => t.isActive);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        setSearchState(prev => ({ ...prev, isActive: true }));
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setSettingsOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setAiChatOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        setDownloadsOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'h') {
        e.preventDefault();
        setHistoryOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setBookmarksOpen(false);
        setDownloadsOpen(false);
        setHistoryOpen(false);
        setAiChatOpen(false);
        setSettingsOpen(false);
        setSearchState(prev => ({ ...prev, isActive: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTabClick = (id: string) => {
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, tabs: w.tabs.map(t => ({ ...t, isActive: t.id === id }))
    } : w));
  };

  const handleToggleGroupCollapse = (groupId: string) => {
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, groups: w.groups.map(g => g.id === groupId ? { ...g, isCollapsed: !g.isCollapsed } : g)
    } : w));
  };

  const handleRenameGroup = (groupId: string, name: string) => {
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, groups: w.groups.map(g => g.id === groupId ? { ...g, name } : g)
    } : w));
  };

  const handleCreateGroup = () => {
    const colors = ['#00FF00', '#007AFF', '#FF2D55', '#AF52DE', '#FF9500'];
    const newGroup: TabGroup = {
      id: Math.random().toString(36).substring(7),
      name: 'New Cluster',
      color: colors[Math.floor(Math.random() * colors.length)],
      isCollapsed: false
    };
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, groups: [...w.groups, newGroup]
    } : w));
    return newGroup.id;
  };

  const handleRemoveGroup = (groupId: string) => {
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, 
      groups: w.groups.filter(g => g.id !== groupId),
      tabs: w.tabs.map(t => t.groupId === groupId ? { ...t, groupId: undefined } : t)
    } : w));
  };

  const handleMoveTabToGroup = (tabId: string, groupId?: string) => {
    let targetGroupId = groupId;
    if (groupId === 'new') {
      targetGroupId = Math.random().toString(36).substring(7);
      const colors = ['#00FF00', '#007AFF', '#FF2D55', '#AF52DE', '#FF9500'];
      const newGroup: TabGroup = {
        id: targetGroupId,
        name: 'Neural Cluster',
        color: colors[Math.floor(Math.random() * colors.length)],
        isCollapsed: false
      };
      setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
        ...w, 
        groups: [...w.groups, newGroup],
        tabs: w.tabs.map(t => t.id === tabId ? { ...t, groupId: targetGroupId } : t)
      } : w));
    } else {
      setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
        ...w, tabs: w.tabs.map(t => t.id === tabId ? { ...t, groupId: targetGroupId } : t)
      } : w));
    }
  };

  const handleCloseTab = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWorkspaces(workspaces.map(w => {
      if (w.id === activeWorkspaceId) {
        const remainingTabs = w.tabs.filter(t => t.id !== id);
        if (remainingTabs.length === 0) {
          const newTab: Tab = { id: 'start', title: 'Neural Dashboard', url: 'vif://dashboard', favicon: '/favicon.ico', isActive: true };
          return { ...w, tabs: [newTab] };
        }
        const closedTab = w.tabs.find(t => t.id === id);
        if (closedTab?.isActive) {
          remainingTabs[remainingTabs.length - 1].isActive = true;
        }
        return { ...w, tabs: remainingTabs };
      }
      return w;
    }));
  };

  const handleNewTab = () => {
    const newId = Math.random().toString(36).substring(7);
    const newTab: Tab = { id: newId, title: 'Neural Gateway', url: 'vif://dashboard', favicon: '/favicon.ico', isActive: true };
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, tabs: [...w.tabs.map(t => ({ ...t, isActive: false })), newTab]
    } : w));
  };

  const saveToHistory = (query: string, type: 'search' | 'url' | 'navigation') => {
    if (!query.trim()) return;
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(7),
      query: query.trim(),
      timestamp: Date.now(),
      type
    };
    setHistory(prev => {
      const filtered = prev.filter(h => h.query !== query.trim());
      return [newItem, ...filtered].slice(0, 50);
    });
  };

  const handleVisit = (val: string) => {
    const isUrl = val.includes('.') || val.startsWith('vif://');
    const finalUrl = isUrl ? (val.startsWith('http') || val.startsWith('vif://') ? val : `https://${val}`) : `https://www.google.com/search?igu=1&q=${encodeURIComponent(val)}`;
    
    if (isRecording) {
      setRecordedEvents(prev => [...prev, { timestamp: Date.now(), type: 'navigation', data: finalUrl }]);
    }

    // Force internal to maintain the "Professional Terminal" experience
    saveToHistory(val, isUrl ? 'url' : 'search');
    
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, tabs: w.tabs.map(t => t.isActive ? { 
        ...t, 
        url: finalUrl, 
        title: isUrl ? val : `Neural Search: ${val}`, 
        favicon: isUrl ? `https://www.google.com/s2/favicons?domain=${val}&sz=32` : '/favicon.ico' 
      } : t)
    } : w));
  };

  const handleOpenInternal = (url: string, title: string) => {
    saveToHistory(title, 'navigation');
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, tabs: w.tabs.map(t => t.isActive ? { 
        ...t, 
        url, 
        title, 
        favicon: `https://www.google.com/s2/favicons?domain=${url}&sz=32` 
      } : t)
    } : w));
  };

  const handleRefresh = () => {
    // Mock refresh by flashing the UI
    const activeTab = workspaces.find(w => w.id === activeWorkspaceId)?.tabs.find(t => t.isActive);
    if (activeTab) {
      saveToHistory(`System Refresh: ${activeTab.title}`, 'navigation');
    }
  };

  const triggerUpdateCheck = () => {
    // Simulate finding a priority kernel patch
    setPendingUpdate({
      version: '8.4.2-STABLE',
      changelog: [
        'Optimized Neural Mesh Uplink (+14%)',
        'Advanced Chimera Iframe Tunneling',
        'Kernel Security Patch: SECTOR_NULL_FIX',
        'Neural Proxy Latency Reduction'
      ],
      size: '1.2 GB',
      isPriority: true
    });
  };

  const handleApplyUpdate = () => {
    if (!pendingUpdate) return;
    
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        isUpdating: true
      }
    }));

    setPendingUpdate(null);

    // Add a fake system update task to downloads
    const id = Math.random().toString(36).substring(7);
    const updateTask: DownloadTask = {
      id,
      filename: `vif_kernel_v${pendingUpdate.version}.patch`,
      url: 'vif://core/update/mesh',
      progress: 0,
      status: 'downloading',
      size: pendingUpdate.size,
      isP2P: true,
      timestamp: Date.now(),
      peers: 642,
      downloadSpeed: '125 MB/s'
    };
    
    setDownloads([updateTask, ...downloads]);
    setDownloadsOpen(true);
    
    saveToHistory(`System Update Initiated: Core ${pendingUpdate.version}`, 'navigation');
  };

  const toggleBookmark = () => {
    if (!activeTab) return;
    const existing = bookmarks.find(b => b.url === activeTab.url);
    if (existing) {
      setBookmarks(bookmarks.filter(b => b.id !== existing.id));
    } else {
      setBookmarks([{
        id: Math.random().toString(36).substring(7),
        title: activeTab.title,
        url: activeTab.url,
        favicon: activeTab.favicon,
        createdAt: Date.now(),
        folderId: null
      }, ...bookmarks]);
    }
  };

  useEffect(() => {
    if (searchState.isActive && searchState.query) {
      // Simulation: find text in StartPage elements
      // For this prototype, we'll just mock a semi-realistic count
      const textToSearch = "VIF Next-Gen Interface Neural Summary Interactive Session Linear GitHub Stripe Vercel Docker Gemini Engine Stable";
      const regex = new RegExp(searchState.query, 'gi');
      const matches = textToSearch.match(regex);
      setSearchState(prev => ({ ...prev, totalResults: matches?.length || 0 }));
    } else {
      setSearchState(prev => ({ ...prev, totalResults: 0, currentIndex: 0 }));
    }
  }, [searchState.query, searchState.isActive, activeTab?.url]);

  const handleCommand = (id: string, val?: string) => {
    setCommandPaletteOpen(false);
    switch(id) {
      case 'new-tab': handleNewTab(); break;
      case 'bookmarks': setBookmarksOpen(true); break;
      case 'history': setHistoryOpen(true); break;
      case 'downloads': setDownloadsOpen(true); break;
      case 'ai-chat': setAiChatOpen(true); break;
      case 'replay': toggleRecording(); break;
      case 'navigate': {
        if (val) {
           const url = val.startsWith('http') ? val : `https://www.google.com/search?q=${encodeURIComponent(val)}`;
           setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
             ...w, tabs: w.tabs.map(t => t.id === activeTab?.id ? { ...t, url, title: val, isActive: true } : { ...t, isActive: false })
           } : w));
        }
        break;
      }
      case 'settings': setSettingsOpen(true); break;
      case 'find': setSearchState(prev => ({ ...prev, isActive: true })); break;
    }
  };

  const startMockDownload = () => {
    const id = Math.random().toString(36).substring(7);
    const isP2P = Math.random() > 0.5;
    const newTask: DownloadTask = {
      id,
      filename: isP2P ? `peer_blob_${id}.mesh` : `vif_patch_${id}.bin`,
      url: isP2P ? 'vif://p2p/swarm/v8' : 'https://vif.io/core/updates/stable',
      progress: 0,
      status: 'downloading',
      size: isP2P ? '1.8GB' : '245MB',
      isP2P,
      timestamp: Date.now(),
      peers: isP2P ? Math.floor(Math.random() * 400) + 100 : undefined,
      downloadSpeed: isP2P ? `${(Math.random() * 20 + 40).toFixed(1)} MB/s` : '12.4 MB/s',
    };
    setDownloads([newTask, ...downloads]);
    setDownloadsOpen(true);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      saveToHistory('Session Replay Saved', 'search');
    } else {
      setRecordingTime(0);
      setRecordedEvents([]);
      setIsRecording(true);
    }
  };

  const handleMirror = (deviceId: string) => {
    setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
      ...w, 
      tabs: w.tabs.map(t => t.isActive ? { ...t, mirroringTo: deviceId } : t)
    } : w));
    
    setMirrorPanelOpen(false);
    saveToHistory(`Mirrored tab to node ${deviceId}`, 'navigation');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads(prev => prev.map(task => {
        if (task.status === 'downloading' && task.progress < 100) {
          const increment = task.isP2P ? Math.floor(Math.random() * 8) + 2 : Math.floor(Math.random() * 5) + 1;
          const nextProgress = Math.min(100, task.progress + increment);
          return {
            ...task,
            progress: nextProgress,
            status: nextProgress === 100 ? (task.isP2P ? 'seeding' : 'completed') : 'downloading'
          };
        }
        return task;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="h-screen w-full flex flex-col bg-vif-bg overflow-hidden select-none relative"
      style={{ 
        '--color-vif-accent': settings.theme.accentColor,
        '--font-sans': settings.theme.fontFamily === 'sans' ? '"Inter", sans-serif' : settings.theme.fontFamily === 'mono' ? '"JetBrains Mono", monospace' : '"Playfair Display", serif',
        filter: `brightness(${settings.theme.brightness})`,
        transition: 'all 0.3s ease'
      } as any}
    >
      <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 scan-line opacity-[0.03] pointer-events-none" />
      
      <Navbar 
        activeTab={activeTab} 
        onTabClick={handleTabClick} 
        tabs={activeWorkspace.tabs} 
        groups={activeWorkspace.groups}
        onNewTab={handleNewTab}
        onToggleGroupCollapse={handleToggleGroupCollapse}
        onRenameGroup={handleRenameGroup}
        onCreateGroup={handleCreateGroup}
        onRemoveGroup={handleRemoveGroup}
        onMoveTabToGroup={handleMoveTabToGroup}
        onCloseTab={handleCloseTab}
      />
      
      <div className="flex-1 flex overflow-hidden relative z-10">
        <motion.div 
          animate={{ width: sidebarOpen ? 64 : 0, opacity: sidebarOpen ? 1 : 0 }}
          className="bg-black/60 border-r border-white/5 flex flex-col items-center py-6 gap-8 z-20 overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4">
            {workspaces.map(w => (
              <motion.div
                key={w.id}
                whileHover={{ scale: 1.1 }}
                onClick={() => setActiveWorkspaceId(w.id)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all border ${
                  activeWorkspaceId === w.id 
                    ? 'border-vif-accent bg-vif-accent/10 shadow-[0_0_10px_rgba(0,255,0,0.2)]' 
                    : 'border-white/5 bg-white/5 text-vif-muted grayscale hover:grayscale-0'
                }`}
              >
                {w.type === 'production' ? <Layers className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
              </motion.div>
            ))}
            <button className="w-9 h-9 border border-white/5 border-dashed rounded-xl flex items-center justify-center text-vif-muted hover:bg-white/5">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="w-8 h-[1px] bg-white/5" />

          <div className="flex-1 space-y-6">
            <div 
               onClick={() => setSecurityOpen(true)}
               className={`p-2 rounded-xl cursor-pointer transition-all group ${securityOpen ? 'bg-vif-accent/20' : 'hover:bg-vif-accent/10'}`}
            >
              <Shield className={`w-5 h-5 group-hover:scale-110 ${securityOpen ? 'text-vif-accent' : 'text-vif-muted'}`} />
            </div>
            <div 
              onClick={() => setBookmarksOpen(true)}
              className={`p-2 rounded-xl cursor-pointer transition-all ${
                bookmarksOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-vif-muted'
              }`}
            >
              <Bookmark className="w-5 h-5" />
            </div>
            <div 
              onClick={() => setDownloadsOpen(true)}
              className={`p-2 rounded-xl cursor-pointer transition-all ${
                downloadsOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-vif-muted'
              }`}
            >
              <Download className="w-5 h-5" />
            </div>
            <div 
              onClick={() => setHistoryOpen(true)}
              className={`p-2 rounded-xl cursor-pointer transition-all ${
                historyOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-vif-muted'
              }`}
            >
              <History className="w-5 h-5" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pb-6 mt-auto">
            {user && (
              <div 
                onClick={handleLogout}
                title="Disconnect Neural Link"
                className="w-10 h-10 rounded-2xl overflow-hidden border border-vif-accent/40 cursor-pointer hover:scale-105 active:scale-95 transition-all group relative"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-vif-accent/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-vif-accent" />
                  </div>
                )}
                <div className="absolute inset-0 bg-red-500/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <LogOut className="w-4 h-4" />
                </div>
              </div>
            )}
            <div 
              onClick={() => setSettingsOpen(true)}
              className={`p-2 rounded-xl cursor-pointer transition-all ${
                settingsOpen ? 'bg-vif-accent/20 text-vif-accent' : 'hover:bg-white/5 text-vif-muted'
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
            </div>
            <div className="w-8 h-8 rounded-full bg-vif-accent/10 border border-vif-accent/30 flex items-center justify-center p-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all">
               <VifLogo className="w-full h-full text-vif-accent" />
            </div>
          </div>
          
          <div className="p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors text-vif-muted">
            <Settings 
              onClick={() => setSettingsOpen(true)}
              className={`w-5 h-5 shadow-inner transition-colors ${settingsOpen ? 'text-vif-accent' : ''}`} 
            />
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col relative overflow-hidden">
          <URLBar 
            url={activeTab?.url || ''} 
            isBookmarked={bookmarks.some(b => b.url === activeTab?.url)}
            onBookmark={toggleBookmark}
            onVisit={handleVisit}
            onFind={() => setSearchState(prev => ({ ...prev, isActive: true }))}
            onMirror={() => setMirrorPanelOpen(true)}
          />
          
          <ReplayOverlay 
            isRecording={isRecording}
            isPlaying={isPlaying}
            onToggleRecording={toggleRecording}
            onStopPlayback={() => setIsPlaying(false)}
            duration={recordingTime}
          />

          <MirrorPanel 
            isOpen={mirrorPanelOpen}
            onClose={() => setMirrorPanelOpen(false)}
            devices={devices}
            onMirror={handleMirror}
          />
          
          <FindInPage 
            state={searchState}
            onUpdate={(u) => setSearchState(prev => ({ ...prev, ...u }))}
            onClose={() => setSearchState(prev => ({ ...prev, isActive: false }))}
          />
          
          <main className="flex-1 overflow-hidden bg-vif-bg relative flex flex-col">
            {pendingUpdate && (
              <SystemUpdateOverlay 
                update={pendingUpdate} 
                onInstall={handleApplyUpdate} 
                onCancel={() => setPendingUpdate(null)} 
              />
            )}
            {activeTab?.url === 'vif://dashboard' ? (
              <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
                <StartPage 
                  onSearch={handleVisit} 
                  onStartDownload={triggerUpdateCheck} 
                  findHighlight={searchState.query} 
                  onOpenInternal={handleOpenInternal}
                  canGoBack={true} 
                  canGoForward={false}
                  onNavigateBack={() => {}}
                  onNavigateForward={() => {}}
                  onRefresh={handleRefresh}
                  openSettings={() => setSettingsOpen(true)}
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col bg-black relative">
                {/* Engine Telemetry Bar - Professional Bridge Layer */}
                <div className="h-9 bg-black/90 border-b border-vif-accent/20 flex items-center justify-between px-4 z-20 backdrop-blur-xl">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-vif-accent rounded-full animate-pulse shadow-[0_0_8px_var(--color-vif-accent)]" />
                        <span className="text-[9px] font-mono text-vif-accent uppercase font-black tracking-widest">Neural Bridge Active</span>
                      </div>
                      <div className="h-3 w-[1px] bg-white/10" />
                      <div className="text-[8px] font-mono text-vif-muted uppercase flex gap-4">
                         <span className="flex items-center gap-1"><Zap className="w-2.5 h-2.5 text-vif-accent" /> 1.28 Tbps</span>
                         <span className="flex items-center gap-1"><Shield className="w-2.5 h-2.5 text-vif-accent" /> AES-GCM-256</span>
                         <span className="flex items-center gap-1 opacity-50"><Globe className="w-2.5 h-2.5" /> Sector-01</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="text-[8px] font-mono text-vif-accent/60 animate-pulse">Latency: 0.12ms</div>
                      <button 
                        onClick={() => window.open(activeTab?.url, '_blank')}
                        className="flex items-center gap-1.5 p-1 px-2 bg-vif-accent/10 hover:bg-vif-accent/20 rounded text-[8px] font-mono text-vif-accent uppercase border border-vif-accent/20 transition-all shrink-0"
                      >
                        <ExternalLink className="w-2.5 h-2.5" /> Neural Breakout
                      </button>
                      <button 
                        onClick={() => handleTabClick('start')}
                        className="p-1 px-2 hover:bg-white/5 rounded text-[8px] font-mono text-vif-muted uppercase border border-white/5 transition-all shrink-0"
                      >
                        Abort Stream
                      </button>
                   </div>
                </div>

                {/* The Real Engine Frame (Iframe) */}
                <div className="flex-1 relative bg-white">
                  <iframe 
                    src={activeTab?.url} 
                    className="w-full h-full border-none"
                    title="VIF Engine Frame"
                    referrerPolicy="no-referrer"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                  />
                  
                  {/* Neural Frame Accents (保持专业感) */}
                  <div className="absolute inset-0 pointer-events-none border-[1px] border-vif-accent/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]" />
                  
                  {/* Telemetry HUD Overlay */}
                  <div className="absolute top-4 right-4 pointer-events-none select-none">
                     <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl space-y-2 shadow-2xl">
                        <div className="flex items-center gap-2">
                           <div className="w-1 h-3 bg-vif-accent rounded-full" />
                           <div className="text-[8px] font-mono text-white uppercase tracking-widest font-black">Frame Telemetry</div>
                        </div>
                        <div className="space-y-1">
                           <div className="flex justify-between gap-6 text-[7px] font-mono text-vif-muted uppercase">
                              <span>Buffer</span>
                              <span className="text-vif-accent">99.9%</span>
                           </div>
                           <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full w-[99%] bg-vif-accent/50" />
                           </div>
                        </div>
                        <div className="text-[7px] font-mono text-[var(--color-vif-accent)] opacity-40 uppercase">
                           Node: {activeTab?.id?.substring(0, 8).toUpperCase()}
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}
            <EngineMonitor />
          </main>

          <AnimatePresence>
            {!aiChatOpen && (
              <motion.button 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, y: -2 }}
                onClick={() => setAiChatOpen(true)}
                className="fixed bottom-10 right-10 w-16 h-16 bg-vif-accent rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,0,0.3)] z-40 group"
              >
                <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <MessageSquare className="w-7 h-7 text-vif-bg" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)}
        onCommand={handleCommand}
        history={history}
      />

      <HistoryPanel 
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onClear={() => setHistory([])}
        onNavigate={(url) => {
          setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
            ...w, tabs: w.tabs.map(t => t.id === activeTab?.id ? { ...t, url, title: url, isActive: true } : { ...t, isActive: false })
          } : w));
          setHistoryOpen(false);
        }}
      />

      <BookmarksManager 
        isOpen={fullBookmarksOpen}
        onClose={() => setFullBookmarksOpen(false)}
        bookmarks={bookmarks}
        folders={folders}
        onDelete={(id) => setBookmarks(bookmarks.filter(b => b.id !== id))}
        onNavigate={(url) => {
          setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
            ...w, tabs: w.tabs.map(t => t.id === activeTab?.id ? { ...t, url, title: url, isActive: true } : { ...t, isActive: false })
          } : w));
          setFullBookmarksOpen(false);
        }}
      />

      <BookmarksPanel 
        isOpen={bookmarksOpen} 
        onClose={() => setBookmarksOpen(false)} 
        bookmarks={bookmarks}
        folders={folders}
        onDelete={(id) => setBookmarks(bookmarks.filter(b => b.id !== id))}
        onNavigate={(url) => {
          setWorkspaces(workspaces.map(w => w.id === activeWorkspaceId ? {
            ...w, tabs: w.tabs.map(t => t.id === activeTab?.id ? { ...t, url, title: url, isActive: true } : { ...t, isActive: false })
          } : w));
          setBookmarksOpen(false);
        }}
        onCreateFolder={(name) => setFolders([...folders, { id: Math.random().toString(36).substring(7), name, createdAt: Date.now() }])}
        onDeleteFolder={(id) => setFolders(folders.filter(f => f.id !== id))}
        onRenameFolder={(id, name) => setFolders(folders.map(f => f.id === id ? { ...f, name } : f))}
        onMoveBookmark={(bid, fid) => setBookmarks(bookmarks.map(b => b.id === bid ? { ...b, folderId: fid } : b))}
      />

      <SettingsPanel 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
        settings={settings}
        onUpdate={(updates) => setSettings({ ...settings, ...updates })}
      />

      <SecurityCenter 
        isOpen={securityOpen} 
        onClose={() => setSecurityOpen(false)} 
      />

      {isAuthLoading ? (
        <div className="fixed inset-0 z-[300] bg-vif-bg flex flex-col items-center justify-center gap-8 technical-grid">
           <VifLogo className="w-20 h-20 text-vif-accent animate-pulse" />
           <div className="flex flex-col items-center gap-2">
             <div className="text-[10px] font-mono text-vif-accent uppercase tracking-[0.4em] font-bold">Checking Neural Identity</div>
             <div className="w-48 h-1 bg-white/5 overflow-hidden rounded-full">
                <motion.div 
                  animate={{ x: ['-100%', '100%'] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="w-1/2 h-full bg-vif-accent" 
                />
             </div>
           </div>
        </div>
      ) : !user ? (
        <LoginOverlay onLogin={handleLogin} loading={isLoggingIn} />
      ) : null}

      <DownloadsPanel 
        isOpen={downloadsOpen}
        onClose={() => setDownloadsOpen(false)}
        downloads={downloads}
        onCancel={(id) => setDownloads(prev => prev.filter(d => d.id !== id))}
        onPause={(id) => setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'paused' } : d))}
        onResume={(id) => setDownloads(prev => prev.map(d => d.id === id ? { ...d, status: 'downloading' } : d))}
      />

      <AIAssistant isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />
    </div>
  );
}
