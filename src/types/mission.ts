export interface MissionMetaData {
  image?: string;
  count: number;
  name: string;
}

export interface MissionData {
  _id: string;
  images: any;
  requirement: any;
  rewardType: string;
  rewardAmount: number;
  name: string;
  endDT: string;
  startDT: string;
  duration: number;
  isCompleted: boolean;
  hasJoined: boolean;
  description?: string;
  location?: string;
}

export interface AvatarData {
  image?: string;
  mint?: string;
  health: number;
  count?: number;
}
