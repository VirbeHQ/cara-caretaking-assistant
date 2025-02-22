import {useState} from 'react';
import {useRouter} from 'next/navigation'

import {Button} from '~/components/ui/button';
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle2,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Phone,
  ShoppingBag
} from 'lucide-react';

interface Alert {
  type: 'wellbeing' | 'medication' | 'activity' | 'emergency';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

export function CaregiverCompanion() {
  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      type: 'wellbeing',
      message: 'Mom reported feeling tired during afternoon check',
      time: '2:30 PM',
      priority: 'medium',
      read: false
    },
    {
      type: 'medication',
      message: 'Blood pressure medication reminder missed',
      time: '11:00 AM',
      priority: 'high',
      read: false
    }
  ]);

  const markAlertRead = (index: number) => {
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

          {/* Shopping & Tasks */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Shopping & Tasks</h3>
              <ShoppingBag className="w-6 h-6 text-green-500"/>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Medications Needed</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 p-2 bg-red-50 rounded text-sm">
                    <AlertCircle className="w-4 h-4 text-red-500"/>
                    Blood pressure medication (3 days left)
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-yellow-50 rounded text-sm">
                    <AlertCircle className="w-4 h-4 text-yellow-500"/>
                    Vitamin D supplements (1 week left)
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Groceries Needed</h4>
                <ul className="space-y-2">
                  {['Fruits', 'Vegetables', 'Milk', 'Bread'].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                      <CheckCircle2 className="w-4 h-4 text-gray-400"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Upcoming Schedule */}
          <section className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Upcoming Schedule</h3>
              <Calendar className="w-6 h-6 text-blue-500"/>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Doctor's Appointment</p>
                    <p className="text-sm text-gray-600">Annual checkup with Dr. Smith</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Today</p>
                    <p className="text-sm text-gray-500">10:15 AM</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Visit with Mom</p>
                    <p className="text-sm text-gray-600">Weekly family visit</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Sunday</p>
                    <p className="text-sm text-gray-500">2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
