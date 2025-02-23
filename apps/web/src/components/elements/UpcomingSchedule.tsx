import {Calendar} from "lucide-react";

export function UpcomingSchedule() {
  return (
    <div>
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
  );
}
