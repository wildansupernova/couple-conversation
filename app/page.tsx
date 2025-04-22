"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Shuffle, MessageSquare } from "lucide-react"
import { topicsByCategory } from "@/data/topics"

export default function ConversationTopics() {
  const [currentTopic, setCurrentTopic] = useState<string>("")
  const [currentCategory, setCurrentCategory] = useState<string>("all")
  const [previousTopics, setPreviousTopics] = useState<string[]>([])

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-600 flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 fill-pink-600" /> Couple's Conversation Starters
          </CardTitle>
          <CardDescription>Generate random topics to spark meaningful conversations with your partner</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
              {categories.slice(0, 5).map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  <span className="flex items-center gap-1">
                    {category.icon}
                    <span className="hidden md:inline">{category.name}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-2 md:grid-cols-5">
              {categories.slice(5).map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  <span className="flex items-center gap-1">
                    {category.icon}
                    <span className="hidden md:inline">{category.name}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="flex flex-col items-center">
                  <Button
                    onClick={() => handleGenerateTopic(category.id)}
                    className="bg-pink-600 hover:bg-pink-700 mb-6"
                    size="lg"
                  >
                    <Shuffle className="mr-2 h-4 w-4" /> Generate Topic
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {currentTopic && (
            <div className="mt-6 p-6 bg-white rounded-lg border border-pink-200 shadow-sm">
              <Badge className="mb-2 bg-pink-100 text-pink-800 hover:bg-pink-200">
                {categories.find((c) => c.id === currentCategory)?.name || "Topic"}
              </Badge>
              <p className="text-xl font-medium text-center">{currentTopic}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-gray-500">
            Swipe through categories and generate topics to deepen your connection
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
