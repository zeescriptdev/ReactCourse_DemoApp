import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { listChats, getChatMessages, sendMessage as apiSendMessage, createChat } from '../../lib/api'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

export interface Chat {
  id: string
  title: string
  created_at: string
  updated_at: string
}

interface ChatsState {
  chats: Chat[]
  messages: Message[]
  currentChatId: string | null
  isLoading: boolean
  isLoadingMessages: boolean
  isSending: boolean
  error: string | null
}

const initialState: ChatsState = {
  chats: [],
  messages: [],
  currentChatId: null,
  isLoading: false,
  isLoadingMessages: false,
  isSending: false,
  error: null,
}

// Async thunks for chat operations
export const loadChats = createAsyncThunk(
  'chats/loadChats',
  async (_, { rejectWithValue }) => {
    try {
      const chats = await listChats()
      return chats
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load chats'
      return rejectWithValue(errorMessage)
    }
  }
)

export const loadMessages = createAsyncThunk(
  'chats/loadMessages',
  async (chatId: string, { rejectWithValue }) => {
    try {
      const messages = await getChatMessages(chatId)
      return messages
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load messages'
      return rejectWithValue(errorMessage)
    }
  }
)

export const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async ({ chatId, content }: { chatId: string; content: string }, { rejectWithValue }) => {
    try {
      const message = await apiSendMessage(chatId, content)
      return message
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      return rejectWithValue(errorMessage)
    }
  }
)

export const createNewChat = createAsyncThunk(
  'chats/createNewChat',
  async (title: string | undefined, { rejectWithValue }) => {
    try {
      const chat = await createChat(title)
      return chat
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create new chat'
      return rejectWithValue(errorMessage)
    }
  }
)

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<string | null>) => {
      state.currentChatId = action.payload
      state.messages = []
    },
    clearError: (state) => {
      state.error = null
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Load chats cases
      .addCase(loadChats.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadChats.fulfilled, (state, action) => {
        state.isLoading = false
        state.chats = action.payload
        state.error = null
      })
      .addCase(loadChats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Load messages cases
      .addCase(loadMessages.pending, (state) => {
        state.isLoadingMessages = true
        state.error = null
      })
      .addCase(loadMessages.fulfilled, (state, action) => {
        state.isLoadingMessages = false
        state.messages = action.payload
        state.error = null
      })
      .addCase(loadMessages.rejected, (state, action) => {
        state.isLoadingMessages = false
        state.error = action.payload as string
      })
      // Send message cases
      .addCase(sendMessage.pending, (state) => {
        state.isSending = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSending = false
        state.messages.push(action.payload)
        state.error = null
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isSending = false
        state.error = action.payload as string
      })
      // Create new chat cases
      .addCase(createNewChat.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createNewChat.fulfilled, (state, action) => {
        state.isLoading = false
        state.chats.unshift(action.payload)
        state.currentChatId = action.payload.id
        state.messages = []
        state.error = null
      })
      .addCase(createNewChat.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setCurrentChat, clearError, addMessage, clearMessages } = chatsSlice.actions
export default chatsSlice.reducer