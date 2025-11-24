/**
 * API Client for Andamio Lesson Coach
 * Connects to MCP server tools via Next.js API routes
 */

export type LessonType = 'product-demo' | 'developer-docs' | 'how-to-guide' | 'org-onboarding';

export interface SLT {
  id: string;
  moduleIndex: number;
  sltText: string;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  sltText: string;
  content: string; // markdown
  contentJson?: any; // Tiptap JSON format
  imageUrl?: string;
  videoUrl?: string;
  live: boolean;
  moduleIndex: number;
}

export interface Module {
  code: string;
  name: string;
  courseNftPolicyId: string;
}

export class LessonCoachAPI {
  private baseUrl: string;
  private jwtToken: string | null = null;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;

    // Load JWT from localStorage on client
    if (typeof window !== 'undefined') {
      this.jwtToken = localStorage.getItem('andamio_jwt_token');
    }
  }

  setJwtToken(token: string) {
    this.jwtToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('andamio_jwt_token', token);
    }
  }

  getJwtToken(): string | null {
    return this.jwtToken;
  }

  clearJwtToken() {
    this.jwtToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('andamio_jwt_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.jwtToken) {
      headers['Authorization'] = `Bearer ${this.jwtToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(error.error || `Request failed: ${response.status}`);
    }

    return response.json();
  }

  // SLT Validation
  async validateSLT(slt: string) {
    return this.request<{ valid: boolean; suggestions?: string[] }>('/validate-slt', {
      method: 'POST',
      body: JSON.stringify({ slt }),
    });
  }

  // Lesson Type Suggestion
  async suggestLessonType(slt: string) {
    return this.request<{ lessonType: LessonType; rationale: string }>('/suggest-lesson-type', {
      method: 'POST',
      body: JSON.stringify({ slt }),
    });
  }

  // Lesson Generation
  async generateLesson(params: {
    slt: string;
    lessonType: LessonType;
    materials?: string;
    moduleName?: string;
    courseName?: string;
  }) {
    return this.request<{ markdown: string }>('/generate-lesson', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Fetch Module SLTs
  async fetchModuleSLTs(courseNftPolicyId: string, moduleCode: string) {
    return this.request<{ slts: SLT[] }>('/fetch-module-slts', {
      method: 'POST',
      body: JSON.stringify({ courseNftPolicyId, moduleCode }),
    });
  }

  // Create SLT
  async createSLT(params: {
    courseNftPolicyId: string;
    moduleCode: string;
    moduleIndex: number;
    sltText: string;
  }) {
    return this.request<{ slt: SLT }>('/create-slt', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Update SLT
  async updateSLT(params: {
    courseNftPolicyId: string;
    moduleCode: string;
    moduleIndex: number;
    sltText?: string;
    newModuleIndex?: number;
  }) {
    return this.request<{ slt: SLT }>('/update-slt', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  // Delete SLT
  async deleteSLT(courseNftPolicyId: string, moduleCode: string, moduleIndex: number) {
    return this.request<{ success: boolean }>('/delete-slt', {
      method: 'POST',
      body: JSON.stringify({ courseNftPolicyId, moduleCode, moduleIndex }),
    });
  }

  // Fetch Module Lessons
  async fetchModuleLessons(courseNftPolicyId: string, moduleCode: string) {
    return this.request<{ lessons: Lesson[] }>('/fetch-module-lessons', {
      method: 'POST',
      body: JSON.stringify({ courseNftPolicyId, moduleCode }),
    });
  }

  // Fetch Lesson
  async fetchLesson(courseNftPolicyId: string, moduleCode: string, moduleIndex: number) {
    return this.request<{ lesson: Lesson }>('/fetch-lesson', {
      method: 'POST',
      body: JSON.stringify({ courseNftPolicyId, moduleCode, moduleIndex }),
    });
  }

  // Create Lesson
  async createLesson(params: {
    courseNftPolicyId: string;
    moduleCode: string;
    moduleIndex: number;
    title?: string;
    description?: string;
    markdownContent?: string;
    imageUrl?: string;
    videoUrl?: string;
  }) {
    // Filter out null/undefined/empty values to avoid API validation errors
    const filteredParams: any = {
      courseNftPolicyId: params.courseNftPolicyId,
      moduleCode: params.moduleCode,
      moduleIndex: params.moduleIndex,
    };

    if (params.title !== undefined && params.title !== null) {
      filteredParams.title = params.title;
    }
    if (params.description !== undefined && params.description !== null) {
      filteredParams.description = params.description;
    }
    if (params.markdownContent !== undefined && params.markdownContent !== null) {
      filteredParams.markdownContent = params.markdownContent;
    }
    if (params.imageUrl && params.imageUrl !== '') {
      filteredParams.imageUrl = params.imageUrl;
    }
    if (params.videoUrl && params.videoUrl !== '') {
      filteredParams.videoUrl = params.videoUrl;
    }

    return this.request<{ lesson: Lesson }>('/create-lesson', {
      method: 'POST',
      body: JSON.stringify(filteredParams),
    });
  }

  // Update Lesson
  async updateLesson(params: {
    courseNftPolicyId: string;
    moduleCode: string;
    moduleIndex: number;
    title?: string;
    description?: string;
    markdownContent?: string;
    imageUrl?: string;
    videoUrl?: string;
    live?: boolean;
  }) {
    // Filter out null/undefined/empty values to avoid API validation errors
    const filteredParams: any = {
      courseNftPolicyId: params.courseNftPolicyId,
      moduleCode: params.moduleCode,
      moduleIndex: params.moduleIndex,
    };

    if (params.title !== undefined && params.title !== null) {
      filteredParams.title = params.title;
    }
    if (params.description !== undefined && params.description !== null) {
      filteredParams.description = params.description;
    }
    if (params.markdownContent !== undefined && params.markdownContent !== null) {
      filteredParams.markdownContent = params.markdownContent;
    }
    if (params.imageUrl && params.imageUrl !== '') {
      filteredParams.imageUrl = params.imageUrl;
    }
    if (params.videoUrl && params.videoUrl !== '') {
      filteredParams.videoUrl = params.videoUrl;
    }
    if (params.live !== undefined && params.live !== null) {
      filteredParams.live = params.live;
    }

    return this.request<{ lesson: Lesson }>('/update-lesson', {
      method: 'POST',
      body: JSON.stringify(filteredParams),
    });
  }

  // Delete Lesson
  async deleteLesson(courseNftPolicyId: string, moduleCode: string, moduleIndex: number) {
    return this.request<{ success: boolean }>('/delete-lesson', {
      method: 'POST',
      body: JSON.stringify({ courseNftPolicyId, moduleCode, moduleIndex }),
    });
  }

  // Refine Lesson
  async refineLesson(params: {
    slt: string;
    currentContent: string;
    feedback: string;
    lessonType?: LessonType;
  }) {
    return this.request<{ markdown: string }>('/refine-lesson', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

// Singleton instance
export const api = new LessonCoachAPI();
