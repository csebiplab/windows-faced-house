import { Pencil, Trash2 } from "lucide-react";

export const HeroTable = ({
  section,
  headers,
}: {
  section: any;
  headers: any;
}) => {
  return (
    <div className="border rounded-md overflow-x-auto mb-6">
      <div className="flex justify-between items-center p-2 border-b bg-gray-50">
        <h2 className="font-semibold">{section.kind}</h2>
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <Pencil size={18} /> Update
          </button>
          <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header: any) => (
              <th key={header} className="p-2 border">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.sectionContent.map((content: any, idx: number) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border">{section.page}</td>
              <td className="p-2 border">{section.kind}</td>
              <td className="p-2 border">{content.state}</td>
              <td className="p-2 border">{content.title}</td>
              <td className="p-2 border">{content.buttonName}</td>
              <td className="p-2 border">{content.description}</td>
              <td className="p-2 border">
                <img
                  src={content.imgUrl}
                  alt="banner"
                  className="w-14 h-10 object-cover rounded"
                />
              </td>
              <td className="p-2 border">
                {new Date(section.updatedAt).toLocaleDateString()}
              </td>
              <td className="p-2 border">
                {new Date(section.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
