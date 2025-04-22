"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Shuffle, MessageSquare } from "lucide-react"
import { topicsByCategory } from "@/data/topics"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function ConversationTopics() {
  const [currentTopic, setCurrentTopic] = useState<string>("")
  const [currentCategory, setCurrentCategory] = useState<string>("all")
  const [previousTopics, setPreviousTopics] = useState<string[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")

  const getRandomTopic = (category: string) => {
    let topics: string[] = []

    if (category === "all") {
      // Get all topics from all categories
      Object.values(topicsByCategory).forEach((categoryTopics) => {
        topics = [...topics, ...categoryTopics]
      })
    } else {
      topics = topicsByCategory[category] || []
    }

    // Filter out previous topics if possible
    const availableTopics = topics.filter((topic) => !previousTopics.includes(topic))

    // If we've used all topics or none available, reset history
    if (availableTopics.length === 0) {
      setPreviousTopics([])
      return topics[Math.floor(Math.random() * topics.length)]
    }

    return availableTopics[Math.floor(Math.random() * availableTopics.length)]
  }

  const handleGenerateTopic = (category: string) => {
    setCurrentCategory(category)
    const newTopic = getRandomTopic(category)
    setCurrentTopic(newTopic)
    setPreviousTopics((prev) => [...prev, newTopic])
  }

  const categories = [
    { id: "all", name: "All Topics", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "deep", name: "Deep Conversation", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "sports", name: "Sports", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "intimate", name: "Intimate & Sex", icon: <Heart className="h-4 w-4" /> },
    { id: "flirty", name: "Flirty", icon: <Heart className="h-4 w-4" /> },
    { id: "travel", name: "Travel", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "future", name: "Future Plans", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "entertainment", name: "Entertainment", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "food", name: "Food & Cooking", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "childhood", name: "Childhood", icon: <MessageSquare className="h-4 w-4" /> },
  ]

  // Split categories for mobile view
  const renderCategoryTabs = () => {
    if (isMobile) {
      return (
        <div className="w-full overflow-x-auto pb-2">
          <TabsList className="flex w-max">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-3 py-1.5">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  {category.icon}
                  <span className="text-xs">{category.name}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      )
    }

    return (
      <>
        <TabsList className="grid grid-cols-5 mb-4">
          {categories.slice(0, 5).map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              <span className="flex items-center gap-1">
                {category.icon}
                <span className="hidden md:inline">{category.name}</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsList className="grid grid-cols-5">
          {categories.slice(5).map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              <span className="flex items-center gap-1">
                {category.icon}
                <span className="hidden md:inline">{category.name}</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-2 sm:p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-3xl font-bold text-pink-600 flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 sm:h-6 sm:w-6 fill-pink-600" /> Couple's Conversation Starters
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Generate random topics to spark meaningful conversations with your partner
          </CardDescription>
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          <Tabs defaultValue="all" className="w-full">
            {renderCategoryTabs()}

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-4 sm:mt-6">
                <div className="flex flex-col items-center">
                  <Button
                    onClick={() => handleGenerateTopic(category.id)}
                    className="bg-pink-600 hover:bg-pink-700 mb-4 sm:mb-6 w-full sm:w-auto"
                    size={isMobile ? "default" : "lg"}
                  >
                    <Shuffle className="mr-2 h-4 w-4" /> Generate Topic
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {currentTopic && (
            <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white rounded-lg border border-pink-200 shadow-sm">
              <Badge className="mb-2 bg-pink-100 text-pink-800 hover:bg-pink-200">
                {categories.find((c) => c.id === currentCategory)?.name || "Topic"}
              </Badge>
              <p className="text-base sm:text-xl font-medium text-center mt-2">{currentTopic}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-4 sm:pt-6 px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Swipe through categories and generate topics to deepen your connection
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
