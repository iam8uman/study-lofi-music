'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Music, MessageCircle, Coffee, BookOpen, Settings, HelpCircle, X, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const iconVariants = {
  initial: { y: 0 },
  hover: { y: -5, scale: 2.5, transition: { duration: 0.1 } }
}

const tooltipVariants = {
  initial: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0 }
}

const modalVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

const BreakModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      className="fixed inset-0 bg-gradient-to-b from-purple-900/80 to-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-800/90 p-44 relative bottom-44 rounded-2xl border border-purple-500/30 shadow-2xl max-w-7xl h-[97vh] mb-96 w-full mx-4"
      >
        <div className="text-center space-y-6">
          <Coffee className="h-44 w-44 text-purple-300 mx-auto" />
          <h2 className="text-2xl font-serif text-purple-100">Time for a Break!</h2>
          <p className="text-purple-300/80">Take a moment to relax, breathe, and enjoy your coffee ☕</p>
          <Button
            onClick={onClose}
            className="bg-purple-500/20 px-8 py-6 hover:bg-purple-500/30 text-purple-100 border border-purple-500/30"
          >
            Back to Work
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const TodoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  const saveTodos = (updatedTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  const addTodo = () => {
    if (!newTodo.trim()) return
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    }
    saveTodos([...todos, todo])
    setNewTodo('')
  }

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    saveTodos(updatedTodos)
  }

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter(todo => todo.id !== id))
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={modalVariants}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 w-96 bg-gray-900 rounded-lg shadow-xl border border-purple-500/20 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif text-purple-300">Notes & Todos</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4 text-purple-300" />
        </Button>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new note..."
          className="bg-gray-800 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50"
        />
        <Button onClick={addTodo} variant="ghost" size="icon">
          <Plus className="h-4 w-4 text-purple-300" />
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="rounded border-purple-500/30 text-purple-500 focus:ring-purple-500"
            />
            <span className={cn(
              "flex-1 font-serif text-sm text-purple-100",
              todo.completed && "line-through text-purple-300/50"
            )}>
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              className="h-6 w-6"
            >
              <X className="h-3 w-3 text-purple-300/70" />
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const icons = [
  { Icon: Music, label: 'Playlist', onClick: () => console.log('Open playlist') },
  { Icon: MessageCircle, label: 'Notes', onClick: undefined },
  { Icon: Coffee, label: 'Take a break', onClick: undefined },
  { Icon: BookOpen, label: 'Study resources', onClick: () => console.log('Open study resources') },
  { Icon: Settings, label: 'Settings', onClick: () => console.log('Open settings') },
  { Icon: HelpCircle, label: 'Help', onClick: () => console.log('Open help') },
]

export function Footer() {
  const [isTodoOpen, setIsTodoOpen] = useState(false)
  const [isBreakOpen, setIsBreakOpen] = useState(false)

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-60 backdrop-blur-sm py-4">
      <div className="container mx-auto">
        <TooltipProvider>
          <div className="flex justify-center space-x-6">
            {icons.map(({ Icon, label, onClick }, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    animate="initial"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={
                        Icon === MessageCircle ? () => setIsTodoOpen(!isTodoOpen) :
                        Icon === Coffee ? () => setIsBreakOpen(!isBreakOpen) :
                        onClick
                      }
                      className="text-purple-300 hover:text-purple-100 hover:bg-transparent transition-colors duration-200"
                    >
                      <motion.div variants={iconVariants}>
                        <Icon className="h-8 w-8" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <motion.div
                    variants={tooltipVariants}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
        <AnimatePresence>
          {isTodoOpen && <TodoModal isOpen={isTodoOpen} onClose={() => setIsTodoOpen(false)} />}
          {isBreakOpen && <BreakModal isOpen={isBreakOpen} onClose={() => setIsBreakOpen(false)} />}
        </AnimatePresence>
      </div>
    </footer>
  )
}