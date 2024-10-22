'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Music, MessageCircle, Coffee, BookOpen, Settings, HelpCircle } from 'lucide-react'

const iconVariants = {
  initial: { y: 0 },
  hover: { y: -5, scale: 2.5, transition: { duration: 0.1 } }
}

const tooltipVariants = {
  initial: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0 }
}

const icons = [
  { Icon: Music, label: 'Playlist', onClick: () => console.log('Open playlist') },
  { Icon: MessageCircle, label: 'Chat', onClick: () => console.log('Open chat') },
  { Icon: Coffee, label: 'Take a break', onClick: () => console.log('Start break timer') },
  { Icon: BookOpen, label: 'Study resources', onClick: () => console.log('Open study resources') },
  { Icon: Settings, label: 'Settings', onClick: () => console.log('Open settings') },
  { Icon: HelpCircle, label: 'Help', onClick: () => console.log('Open help') },
]

export function Footer() {
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
                      onClick={onClick}
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
      </div>
    </footer>
  )
}