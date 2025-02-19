"use client"
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Send, Paperclip, Bot, User } from 'lucide-react'

export default function AIChat({ consultationId, context }) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadMessages()
  }, [consultationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/consultations/${consultationId}/messages`)
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      setStreamingMessage("")

      // Save user message to state immediately
      const userMessage = {
        role: 'user',
        content: newMessage,
        createdAt: new Date().toISOString()
      }
      setMessages(prev => [...prev, userMessage])
      setNewMessage("")

      // Start streaming AI response
      const response = await fetch(`/api/consultations/${consultationId}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: newMessage,
          context
        })
      })

      if (!response.ok) throw new Error('Failed to send message')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value)
        setStreamingMessage(prev => prev + chunk)
      }

      // After streaming completes, add AI message to messages
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: streamingMessage,
        createdAt: new Date().toISOString()
      }])
      setStreamingMessage("")

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className={`flex items-start max-w-[70%] ${
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className={`rounded-full p-2 ${
                message.role === 'user' 
                  ? 'bg-primary-100' 
                  : 'bg-gray-100'
              }`}>
                {message.role === 'user' 
                  ? <User className="w-4 h-4" /> 
                  : <Bot className="w-4 h-4" />}
              </div>
              <div className={`mx-2 rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <pre className="whitespace-pre-wrap font-sans">
                  {message.content}
                </pre>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Streaming Message */}
        {streamingMessage && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-[70%]">
              <div className="rounded-full p-2 bg-gray-100">
                <Bot className="w-4 h-4" />
              </div>
              <div className="mx-2 rounded-lg p-3 bg-gray-100 text-gray-900">
                <pre className="whitespace-pre-wrap font-sans">
                  {streamingMessage}
                </pre>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-4">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows="3"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button
              type="submit"
              disabled={isLoading || !newMessage.trim()}
              className="btn-primary px-6 py-2 flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
