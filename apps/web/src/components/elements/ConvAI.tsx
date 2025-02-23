"use client"

import {Button} from "~/components/ui/button";
import * as React from "react";
import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import {Conversation, Role} from "@11labs/client";
import {cn} from "~/lib/utils";
import {AGENT_OVERRIDES} from "~/common/prompt";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({audio: true})
    return true
  } catch {
    console.error('Microphone permission denied')
    return false
  }
}

async function getSignedUrl(): Promise<string> {
  const response = await fetch('/api/elevenlabs/signed-url')
  if (!response.ok) {
    throw Error('Failed to get signed url')
  }
  const data = await response.json()
  return data.signedUrl
}

interface Props {
  showBlob?: boolean;
  prompt?: string;
  firstMessage?: string;
  dynamicVariables?: Record<string, string | number | boolean>;
  tools?: Record<string, (parameters: any) => Promise<string | number | void> | string | number | void>;
  onMessage?: (message: string, source: Role) => void;
}

export function ConvAI(
  {
    showBlob = false,
    prompt = AGENT_OVERRIDES.PATIENT.prompt,
    firstMessage = AGENT_OVERRIDES.DEFAULT.firstMessage,
    dynamicVariables = {},
    tools = {},
    onMessage
  }: Props) {
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission()
    if (!hasPermission) {
      alert("No permission")
      return;
    }
    const signedUrl = await getSignedUrl()
    const conversation = await Conversation.startSession({
      signedUrl: signedUrl,
      overrides: {
        agent: {
          prompt: {
            prompt: prompt
          },
          firstMessage
        },
      },
      dynamicVariables,
      clientTools: tools,
      onConnect: () => {
        setIsConnected(true)
        setIsSpeaking(true)
      },
      onDisconnect: () => {
        setIsConnected(false)
        setIsSpeaking(false)
      },
      onError: (error) => {
        console.log(error)
        alert('An error occurred during the conversation')
      },
      onModeChange: ({mode}) => {
        setIsSpeaking(mode === 'speaking')
      },
      onMessage: ({message, source}) => {
        console.log(message, source)
        if (onMessage) {
          onMessage(message, source)
        }
      }
    })
    setConversation(conversation)
  }

  async function endConversation() {
    if (!conversation) {
      return
    }
    await conversation.endSession()
    setConversation(null)
  }

  return (
    <div className={"flex justify-center items-center gap-x-4"}>
      <Card className={'rounded-3xl'}>
        <CardContent>
          <CardHeader>
            <CardTitle className={'text-center'}>
              {isConnected ? (
                isSpeaking ? `Agent is speaking` : 'Agent is listening'
              ) : (
                'Disconnected'
              )}
            </CardTitle>
          </CardHeader>
          <div className={'flex flex-col gap-y-4 text-center'}>
            {showBlob && <div className={cn('orb my-16 mx-12',
              isSpeaking ? 'animate-orb' : (conversation && 'animate-orb-slow'),
              isConnected ? 'orb-active' : 'orb-inactive')}
            ></div>}

            {!isConnected && <Button
              variant={'outline'}
              className={'rounded-full'}
              size={"lg"}
              disabled={conversation !== null && isConnected}
              onClick={startConversation}
            >
              Start conversation
            </Button>}
            {isConnected && <Button
              variant={'outline'}
              className={'rounded-full'}
              size={"lg"}
              disabled={conversation === null && !isConnected}
              onClick={endConversation}
            >
              End conversation
            </Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
