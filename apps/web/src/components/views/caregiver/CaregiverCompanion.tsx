import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter} from 'next/navigation'

import {Button} from '~/components/ui/button';
import {ConvAI} from "~/components/elements/ConvAI";

import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Phone,
  ShoppingBag
} from 'lucide-react';

import {useLocalStorage} from "@uidotdev/usehooks";
import {AGENT_OVERRIDES} from "~/common/prompt";
import { CompanionBlob } from '~/components/elements/CompanionBlob';
import {Role} from "@11labs/client";

interface Alert {
  type: 'wellbeing' | 'medication' | 'activity' | 'emergency' | 'symptom';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

export function CaregiverCompanion() {
  const [healthSymptoms, setHealthSymptoms] = useLocalStorage<string[]>('healthSymptoms');
  const [shoppingNeeds, setShoppingNeeds] = useLocalStorage<string[]>('shoppingNeeds');

  const [currentMessage, setCurrentMessage] = useState("Hello! How can I help you today?");

  const healthSymptomsString = useMemo(() => {
    return healthSymptoms.map((symptom, index) => `${index + 1}. ${symptom}`).join('\n');
  }, [healthSymptoms]);
  const shoppingNeedsString = useMemo(() => {
    return shoppingNeeds.map((need, index) => `${index + 1}. ${need}`).join('\n');
  }, [shoppingNeeds]);

  const resetCallback = useCallback(() => {
    setHealthSymptoms([]);
    setShoppingNeeds([]);
  }, [setHealthSymptoms, setShoppingNeeds]);

  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const now = useMemo(() => new Date().toLocaleTimeString(), []);

  useEffect(() => {
    if (healthSymptoms.length > 0) {
      setAlerts(healthSymptoms.map(symptom => ({
        type: 'symptom',
        message: `Mom reported ${symptom}`,
        time: now,
        priority: 'medium',
        read: false
      })));
    }

  }, [now]);

  const onConvAIMessage = useCallback((message, source: Role) => {
    if (source === 'ai'){
      setCurrentMessage(message);
    }
  }, []);

  const markAlertRead = (index: number) => {
    console.log('Marking alert as read:', alerts[index]);
    setAlerts(alerts.map((alert, i) =>
      i === index ? {...alert, read: true} : alert
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-8">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => router.push('/caregiver/dashboard')}
          >
            <LayoutDashboard className="w-4 h-4"/>
            Dashboard
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={resetCallback}>
              Reset
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.alert('Opening chat...')}
            >
              <MessageSquare className="w-4 h-4"/>
              Chat
            </Button>
            <Button
              variant="default"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              onClick={() => window.alert('Starting call...')}
            >
              <Phone className="w-4 h-4"/>
              Call Mom
            </Button>
          </div>
        </div>

        <CompanionBlob currentMessage={currentMessage}/>

        <div className="mb-8">
          <ConvAI
            prompt={AGENT_OVERRIDES.CAREGIVER.prompt}
            firstMessage={AGENT_OVERRIDES.CAREGIVER.firstMessage}
            dynamicVariables={{
              ...AGENT_OVERRIDES.CAREGIVER.defaultVariables,
              healthSymptoms: healthSymptomsString,
              shoppingNeeds: shoppingNeedsString
            }}
            onMessage={onConvAIMessage}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alerts & Notifications */}
          <section className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Important Updates</h3>
              <Bell className="w-6 h-6 text-blue-500"/>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex items-start justify-between ${
                    alert.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                  onClick={() => markAlertRead(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100' :
                        alert.priority === 'medium' ? 'bg-yellow-100' :
                          'bg-green-100'
                    }`}>
                      <AlertCircle className={`w-4 h-4 ${
                        alert.priority === 'high' ? 'text-red-600' :
                          alert.priority === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                      }`}/>
                    </div>
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                  {!alert.read && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Shopping & Tasks */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Shopping & Tasks</h3>
              <ShoppingBag className="w-6 h-6 text-green-500"/>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Groceries Needed</h4>
                <ul className="space-y-2">
                  {shoppingNeeds.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                      <CheckCircle2 className="w-4 h-4 text-gray-400"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Status */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Today's Wellbeing</h3>
              <Heart className="w-6 h-6 text-red-500"/>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Mood</span>
                  <span className="text-2xl">😊</span>
                </div>
                <p className="text-sm text-gray-600">Feeling good, enjoyed morning activities</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Activity Level</span>
                  <span className="text-green-600 font-medium">Good</span>
                </div>
                <p className="text-sm text-gray-600">Completed morning exercises and puzzle</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Medication</span>
                  <span className="text-yellow-600 font-medium">1 Missed</span>
                </div>
                <p className="text-sm text-gray-600">Morning medications taken, afternoon pending</p>
              </div>
            </div>
          </section>

          {/* Upcoming Schedule */}

        </div>
      </div>
    </div>
  );
}
