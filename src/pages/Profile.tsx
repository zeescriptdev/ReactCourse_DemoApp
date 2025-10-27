import { useState } from 'react'

// Mock profile data for static display
const mockProfile = {
  display_name: 'John Doe',
  bio: 'Full-stack developer passionate about React and TypeScript. Love building user-friendly applications and learning new technologies.',
  email: 'john.doe@example.com',
  created_at: '2024-01-10T08:30:00Z'
}

export default function Profile() {
  const [displayName, setDisplayName] = useState(mockProfile.display_name)
  const [bio, setBio] = useState(mockProfile.bio)

  const handleSave = () => {
    alert('This is a static demo - profile saving is disabled')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white border rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800 text-sm">
            This is a static demo for lecture purposes. Profile editing is disabled.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            value={mockProfile.email} 
            disabled 
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Display name</label>
          <input 
            value={displayName} 
            onChange={e=>setDisplayName(e.target.value)} 
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea 
            value={bio} 
            onChange={e=>setBio(e.target.value)} 
            className="w-full border rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Member since</label>
          <input 
            value={new Date(mockProfile.created_at).toLocaleDateString()} 
            disabled 
            className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600" 
          />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleSave} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          <a href="/" className="text-gray-700 px-4 py-2 hover:underline">Back to Chat</a>
        </div>
      </div>
    </div>
  )
}