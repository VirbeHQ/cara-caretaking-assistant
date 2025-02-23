import {AlertCircle} from "lucide-react";

export function MedicationsCheck() {
  return (
    <div>
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
    </div>
  );
}
