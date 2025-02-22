import {useState} from 'react';
import {useNavigate} from 'react-router';

import {Button} from '@/components/ui/button';
import {CheckCircle2, LayoutDashboard, MessageSquare, Mic, MicOff, Phone} from 'lucide-react';

interface ChecklistItem {
  id: string;
  time: string;
  title: string;
  completed: boolean;
}

export function CompanionInterface() {
  const [isListening, setIsListening] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("Hello! How can I help you today?");
  const navigate = useNavigate();

  const [checklist] = useState<ChecklistItem[]>([
    {id: '1', time: '9:00 AM', title: 'Morning Brief', completed: false},
    {id: '2', time: '11:00 AM', title: 'Wellbeing Check', completed: false},
    {id: '3', time: '3:00 PM', title: 'Afternoon Wrap-up', completed: false},
  ]);

  const [dailyChecklist, setDailyChecklist] = useState(checklist);

  const toggleChecklistItem = (id: string) => {
    setDailyChecklist(items =>
      items.map(item =>
        item.id === id ? {...item, completed: !item.completed} : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-8">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard className="w-4 h-4"/>
            Dashboard
          </Button>
          <Button
            variant="default"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => window.alert('Starting caregiver call...')}
          >
            <Phone className="w-4 h-4"/>
            Call Caregiver
          </Button>
        </div>

        {/* Companion Blob */}
        <div className="relative h-96 flex items-center justify-center mb-8">
          <div className="absolute">
            <div className="relative">
              <div
                className="animate-blob w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div
                className="animate-blob animation-delay-2000 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 absolute -top-4 -left-4"></div>
              <div
                className="animate-blob animation-delay-4000 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 absolute -bottom-8 -right-4"></div>
            </div>
          </div>

          {/* Message Display */}
          <div className="relative z-10 bg-white bg-opacity-90 p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
            <p className="text-lg text-center">{currentMessage}</p>
          </div>
        </div>

        {/* Voice Control */}
        <div className="flex justify-center mb-8">
          <Button
            size="lg"
            variant={isListening ? "default" : "outline"}
            className="rounded-full w-16 h-16 p-0"
            onClick={() => setIsListening(!isListening)}
          >
            {isListening ? (
              <MicOff className="w-6 h-6"/>
            ) : (
              <Mic className="w-6 h-6"/>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Prompts */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Quick Prompts</h3>
              <MessageSquare className="w-6 h-6 text-blue-500"/>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left">
                Let's play a word game
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                What's in today's news?
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                How am I feeling today?
              </Button>
            </div>
          </div>

          {/* Daily Checklist */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Daily Checklist</h3>
              <CheckCircle2 className="w-6 h-6 text-green-500"/>
            </div>
            <div className="space-y-3">
              {dailyChecklist.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  className={`w-full justify-between ${item.completed ? 'bg-green-50' : ''}`}
                  onClick={() => toggleChecklistItem(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{item.time}</span>
                    <span>{item.title}</span>
                  </div>
                  <CheckCircle2
                    className={`w-5 h-5 ${item.completed ? 'text-green-500' : 'text-gray-300'}`}
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
