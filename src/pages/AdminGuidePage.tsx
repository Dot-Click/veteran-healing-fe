import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "../components/layout/AdminLayout";
import { FileUp, Download, Trash2, Loader } from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function AdminGuidePage() {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [guideTitle, setGuideTitle] = useState("Veteran Healing Microdose Guide");
  const [guideDescription, setGuideDescription] = useState(
    "A comprehensive guide for veterans on microdosing practices and safety"
  );
  const [isUploading, setIsUploading] = useState(false);

  const { data: guides = [], isLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await api.get("/guides");
      return res.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post("/guides/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("PDF guide uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      setSelectedFile(null);
      setGuideTitle("Veteran Healing Microdose Guide");
      setGuideDescription("A comprehensive guide for veterans on microdosing practices and safety");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to upload guide");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (guideId: string) => {
      const res = await api.delete(`/guides/${guideId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Guide deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
    onError: () => {
      toast.error("Failed to delete guide");
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        // 50MB limit
        toast.error("File size must be less than 50MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", guideTitle);
    formData.append("description", guideDescription);

    setIsUploading(true);
    try {
      await uploadMutation.mutateAsync(formData);
    } finally {
      setIsUploading(false);
    }
  };

  const latestGuide = guides[0];

  return (
    <AdminLayout title="PDF Guide Management">
      <div className="space-y-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
            <FileUp size={24} />
            Upload New Guide PDF
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guide Title
              </label>
              <input
                type="text"
                value={guideTitle}
                onChange={(e) => setGuideTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                placeholder="e.g., Veteran Healing Microdose Guide"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={guideDescription}
                onChange={(e) => setGuideDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                placeholder="Describe the guide content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select PDF File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="pdf-input"
                />
                <label htmlFor="pdf-input" className="cursor-pointer block">
                  <FileUp size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    {selectedFile ? selectedFile.name : "Click to select PDF or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF files up to 50MB</p>
                </label>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FileUp size={18} />
                  Upload Guide PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Current Guide Section */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        ) : latestGuide ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-brand-dark mb-4">Current Guide</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">{latestGuide.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{latestGuide.description}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-500">
                  Uploaded: {new Date(latestGuide.uploadedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={latestGuide.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download PDF
                </a>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this guide?")) {
                      deleteMutation.mutate(latestGuide.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-500">No guide uploaded yet. Upload one above to get started.</p>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">ℹ️ About Guide Delivery</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Users who sign up for the free guide will receive an email with the PDF attached</li>
            <li>• Only the latest uploaded guide will be sent to new subscribers</li>
            <li>• The PDF attachment will be included in the welcome email</li>
            <li>• Users can also download the guide from the file URL if needed</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
