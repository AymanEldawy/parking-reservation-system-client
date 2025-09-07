export function getLogColor(type: string): string {
  if(!type) return "";

  switch (type) {
    case "category-rates-changed":
      return "text-blue-600 bg-blue-100";
    case "zone-opened":
      return "text-green-600 bg-green-100"; 
    case "zone-closed":
      return "text-red-600 bg-red-100"; 
    case "rush-updated":
      return "text-yellow-700 bg-yellow-100"; 
    case "vacation-added":
      return "text-purple-600 bg-purple-100"; 
    default:
      return "text-gray-600 bg-gray-100"; 
  }
}