export interface SessionEvent {
  timestamp: number;
  type: 'navigation' | 'click' | 'input' | 'scroll';
  data: any;
}

export interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  status: 'online' | 'offline';
  lastSeen: number;
}

export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string;
  isActive: boolean;
  groupId?: string;
  mirroringTo?: string;
}

export interface TabGroup {
  id: string;
  name: string;
  color: string;
  isCollapsed: boolean;
}

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  favicon: string;
  createdAt: number;
  folderId?: string | null;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface HistoryItem {
  id: string;
  query: string;
  timestamp: number;
  type: 'search' | 'url' | 'navigation';
}

export interface DownloadTask {
  id: string;
  filename: string;
  size: string;
  progress: number;
  status: 'downloading' | 'completed' | 'paused' | 'failed' | 'seeding';
  timestamp: number;
  url: string;
  isP2P?: boolean;
  peers?: number;
  seederCount?: number;
  downloadSpeed?: string;
  uploadSpeed?: string;
  swarmHealth?: number;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface AppSettings {
  theme: {
    accentColor: string;
    backgroundImage: string;
    fontFamily: 'sans' | 'mono' | 'serif';
    transparency: number;
    brightness: number;
  };
  search: {
    findInPage: boolean;
    lastQuery: string;
  };
  system: {
    version: string;
    patchLevel: number;
    lastUpdate: number;
    isUpdating: boolean;
  };
}

export interface KernelUpdate {
  version: string;
  changelog: string[];
  size: string;
  isPriority: boolean;
}

export interface SearchState {
  isActive: boolean;
  query: string;
  currentIndex: number;
  totalResults: number;
}

export type WorkspaceType = 'production' | 'development' | 'research' | 'creative';

export interface Workspace {
  id: string;
  name: string;
  type: WorkspaceType;
  tabs: Tab[];
  groups: TabGroup[];
  theme?: Partial<AppSettings['theme']>;
}
