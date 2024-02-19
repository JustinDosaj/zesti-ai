export interface Creator {
    name: string;
    desc: string;
    imageSrc: string;
    href: string;
}

export interface ToolHeroProps {
    role: string | null,
    tokens: number,
    titleStart?: string,
    titleEnd?: string,
    description?: string
}

export interface AIChatMessageProps {
    id: string;
    sender: string;
    text: string;
    timestamp: Date | { seconds: number, nanoseconds: number }; // Adjust based on the actual shape of the timestamp
}

export interface RecipeProps {
    recipe: any,
    url?: string,
    setLoginPrompt?: any
    setPremiumPrompt?: any
    owner_id?: string,
    setEditMode?: any,
    role?: any,
}

export interface CreatorPageRecentRecipesProps {
    recipes: any,
    creatorName: string,
    maxDisplayCount?: number,
    incrementCount?: number
    owner_id?: string,
  }
  
export interface RecipeCardProps {
    item: any,
    creatorName?: string,
    key?: any,
}

export interface HeroProps {
    titleStart?: string,
    titleEnd?: string,
    description?: string,
}

export interface CreatorCTAProps {
    isHome: boolean,
    title: string,
}

export interface UserSavedRecipeListProps {
    recipes: any,
    creatorName?: string,
    maxDisplayCount?: number,
    incrementCount?: number,
    max?: number,
    loading?: boolean,
}


export interface TextProps {
    children?: React.ReactNode,
    className?:string,
}


export interface ModalResponseProps {
    isOpen?: boolean,
    setIsOpen?: any,
    isCreatorModalOpen?: boolean,
    setIsCreatorModalOpen?: any,
    success?: boolean,
    onSubmit?: any,
    message?: any,
    role?: any,
}

// Currently Not In Use

export interface RecentTikTokVideosProps {
    videoList: any,
    creatorData: any,
    setIsOpen: any,
    setUrlId?: any,
    setUrl: any,
    setVideoObject: any,
    maxDisplayCount?: number,
    incrementCount?: number,
}