import {useState} from 'react';
import {useNavigate} from 'react-router';

import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import {
  Activity,
  Bell,
  Book,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight as ChessKnight,
  Heart,
  Home,
  Puzzle,
  Settings,
  ShoppingBag
} from 'lucide-react';

interface TimeSlot {
  hour: number;
  minute: number;
}

interface ScheduleItem {
  time: string;
  title: string;
  type: 'appointment' | 'visit' | 'activity' | 'chore';
  details?: string;
  status?: string;
}

export function Dashboard() {
  const [isCaregiverView, setIsCaregiverView] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'preferences'>('overview');
  const navigate = useNavigate();

  const [interests, setInterests] = useState([
    {id: 'books', name: 'Books & Reading', icon: <Book className="w-6 h-6"/>, selected: true},
    {id: 'chess', name: 'Chess', icon: <ChessKnight className="w-6 h-6"/>, selected: true},
    {id: 'puzzles', name: 'Puzzles', icon: <Puzzle className="w-6 h-6"/>, selected: false},
  ]);

  const schedule: ScheduleItem[] = [
    {
      time: '9:00 AM',
      title: 'Morning Brief',
      type: 'activity',
      status: 'Completed',
      details: 'Daily news update and medication reminder'
    },
    {
      time: '10:15 AM',
      title: 'Doctor\'s Appointment',
      type: 'appointment',
      details: 'Annual checkup with Dr. Smith'
    },
    {
      time: '11:00 AM',
      title: 'Wellbeing Check',
      type: 'activity',
      status: 'Upcoming'
    },
    {
      time: '2:00 PM',
      title: 'Grocery Shopping',
      type: 'chore',
      details: '- Fruits and vegetables\n- Milk and eggs\n- Bread\n- Tea'
    },
    {
      time: '3:00 PM',
      title: 'Afternoon Wrap-up',
      type: 'activity',
      status: 'Upcoming'
    },
  ];

  const upcomingEvents = [
    {
      date: 'Sunday',
      time: '2:00 PM',
      title: 'Visit with John',
      type: 'visit',
      details: 'Weekly family visit'
    }
  ];

  const shoppingList = [
    {
      type: 'Medications',
      items: [
        'Blood pressure medication',
        'Vitamin D supplements',
        'Pain relief tablets'
      ]
    },
    {
      type: 'Groceries',
      items: [
        'Fruits and vegetables',
        'Milk and eggs',
        'Bread',
        'Tea'
      ]
    }
  ];

  const wellbeingHistory = [
    {date: '2024-03-10', status: 'Good', mood: '😊', notes: 'Enjoyed chess and reading'},
    {date: '2024-03-09', status: 'Neutral', mood: '😐', notes: 'Felt tired in the afternoon'},
    {date: '2024-03-08', status: 'Good', mood: '😊', notes: 'Very engaged in activities'},
  ];

  const recentActivities = [
    {
      time: '9:00 AM',
      activity: 'Morning Brief',
      status: 'Completed',
      preview: 'Reviewed daily schedule and news highlights'
    },
    {
      time: '10:15 AM',
      activity: 'Chess Puzzle',
      status: 'Completed',
      preview: 'Solved daily puzzle in 5 moves'
    },
    {
      time: '11:00 AM',
      activity: 'Wellbeing Check',
      status: 'Good',
      preview: 'Reported feeling well, no concerns'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <Home className="w-4 h-4"/>
            Back to Companion
          </Button>
          <div className="flex items-center gap-3">
            {isCaregiverView && (
              <Button
                variant="default"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/caregiver')}
              >
                <Bot className="w-4 h-4"/>
                Open Caregiver Companion
              </Button>
            )}
            <Label htmlFor="view-toggle">
              {isCaregiverView ? 'Caregiver View' : 'Patient View'}
            </Label>
            <Switch
              id="view-toggle"
              checked={isCaregiverView}
              onCheckedChange={setIsCaregiverView}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2"
          >
            <Activity className="w-4 h-4"/>
            Overview
          </Button>
          <Button
            variant={activeTab === 'preferences' ? 'default' : 'outline'}
            onClick={() => setActiveTab('preferences')}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4"/>
            {isCaregiverView ? 'Notifications' : 'Preferences'}
          </Button>
        </div>

        {activeTab === 'overview' ? (
          <div className="space-y-8">
            {isCaregiverView ? (
              // Caregiver Overview
              <>
                {/* Schedule */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Schedule</h2>
                    <Calendar className="w-6 h-6 text-blue-500"/>
                  </div>
                  <div className="space-y-4">
                    {schedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <time className="text-sm text-gray-500">{item.time}</time>
                          <div>
                            <span className="font-medium">{item.title}</span>
                            {item.details && (
                              <p className="text-sm text-gray-600">{item.details}</p>
                            )}
                          </div>
                        </div>
                        {item.status && (
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                          }`}>
                            {item.status}
                          </span>
                        )}
                      </div>
                    ))}
                    {upcomingEvents.map((event, index) => (
                      <div key={`upcoming-${index}`}
                           className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-purple-600">
                            <div>{event.date}</div>
                            <div>{event.time}</div>
                          </div>
                          <div>
                            <span className="font-medium">{event.title}</span>
                            <p className="text-sm text-gray-600">{event.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Chores Summary */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Shopping Lists</h2>
                    <ShoppingBag className="w-6 h-6 text-green-500"/>
                  </div>
                  <div className="space-y-6">
                    {shoppingList.map((list, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium text-lg">{list.type}</h3>
                        <ul className="space-y-2">
                          {list.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <CheckCircle2 className="w-4 h-4 text-gray-400"/>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Wellbeing Summary */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Wellbeing Overview</h2>
                    <Heart className="w-6 h-6 text-red-500"/>
                  </div>
                  <div className="space-y-4">
                    {wellbeingHistory.map((check, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{check.date}</p>
                          <p className="text-gray-600">{check.notes}</p>
                        </div>
                        <div className="text-2xl">{check.mood}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Activity Summary */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Recent Activities</h2>
                    <Activity className="w-6 h-6 text-blue-500"/>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <time className="text-sm text-gray-500">{activity.time}</time>
                          <div>
                            <span className="font-medium">{activity.activity}</span>
                            <p className="text-sm text-gray-600">{activity.preview}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              // Patient Overview
              <>
                {/* Daily Checklist */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Daily Checklist</h2>
                    <CheckCircle2 className="w-6 h-6 text-green-500"/>
                  </div>
                  <div className="space-y-4">
                    {schedule
                      .filter(item => item.type === 'activity')
                      .map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <time className="text-sm text-gray-500">{item.time}</time>
                            <span className="font-medium">{item.title}</span>
                          </div>
                          {item.status && (
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                              {item.status}
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </section>

                {/* Schedule */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Today's Schedule</h2>
                    <Calendar className="w-6 h-6 text-blue-500"/>
                  </div>
                  <div className="space-y-4">
                    {schedule
                      .filter(item => item.type !== 'activity')
                      .map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <time className="text-sm text-gray-500">{item.time}</time>
                            <div>
                              <span className="font-medium">{item.title}</span>
                              {item.details && (
                                <p className="text-sm text-gray-600">{item.details}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    {upcomingEvents.map((event, index) => (
                      <div key={`upcoming-${index}`}
                           className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-purple-600">
                            <div>{event.date}</div>
                            <div>{event.time}</div>
                          </div>
                          <div>
                            <span className="font-medium">{event.title}</span>
                            <p className="text-sm text-gray-600">{event.details}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Today's Activities */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Today's Activities</h2>
                    <Activity className="w-6 h-6 text-blue-500"/>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <time className="text-sm text-gray-500">{activity.time}</time>
                          <div>
                            <span className="font-medium">{activity.activity}</span>
                            <p className="text-sm text-gray-600">{activity.preview}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Shopping Lists */}
                <section className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Shopping Lists</h2>
                    <ShoppingBag className="w-6 h-6 text-green-500"/>
                  </div>
                  <div className="space-y-6">
                    {shoppingList.map((list, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium text-lg">{list.type}</h3>
                        <ul className="space-y-2">
                          {list.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <CheckCircle2 className="w-4 h-4 text-gray-400"/>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        ) : (
          // Preferences Tab
          <div className="space-y-8">
            {isCaregiverView ? (
              // Caregiver Notifications
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-6 h-6 text-blue-600"/>
                  <h2 className="text-2xl font-semibold">Notification Preferences</h2>
                </div>
                <div className="space-y-4">
                  {[
                    {id: 'wellbeingAlerts', label: 'Wellbeing Alerts'},
                    {id: 'activityUpdates', label: 'Activity Updates'},
                    {id: 'scheduleChanges', label: 'Schedule Changes'},
                    {id: 'medicationReminders', label: 'Medication Reminders'},
                    {id: 'emergencyAlerts', label: 'Emergency Alerts'}
                  ].map(setting => (
                    <div key={setting.id} className="flex items-center justify-between p-4 hover:bg-accent rounded-lg">
                      <Label className="text-base" htmlFor={setting.id}>
                        {setting.label}
                      </Label>
                      <Switch
                        id={setting.id}
                        defaultChecked
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              // Patient Interests
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">My Interests</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {interests.map(interest => (
                    <Button
                      key={interest.id}
                      onClick={() => {
                        setInterests(interests.map(i =>
                          i.id === interest.id ? {...i, selected: !i.selected} : i
                        ));
                      }}
                      variant={interest.selected ? "default" : "outline"}
                      className="w-full h-auto py-4 px-6"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={interest.selected ? "text-primary-foreground" : "text-primary"}>
                          {interest.icon}
                        </div>
                        <span>{interest.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
