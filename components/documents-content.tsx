"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, FileText, Download, Eye, Trash2, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  name: string
  type: string
  size: string
  client: string
  case: string
  uploadDate: string
  category: "Contract" | "Evidence" | "Legal Brief" | "Court Filing" | "Other"
}

export function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Business_Contract_JohnDoe.pdf",
      type: "PDF",
      size: "2.4 MB",
      client: "John Doe",
      case: "Business Litigation Case",
      uploadDate: "2024-12-15",
      category: "Contract",
    },
    {
      id: "2",
      name: "Evidence_Photos.zip",
      type: "ZIP",
      size: "15.7 MB",
      client: "Jane Smith",
      case: "Family Custody Case",
      uploadDate: "2024-12-10",
      category: "Evidence",
    },
    {
      id: "3",
      name: "Legal_Brief_Wilson.docx",
      type: "DOCX",
      size: "1.2 MB",
      client: "Mike Wilson",
      case: "Criminal Defense Case",
      uploadDate: "2024-12-08",
      category: "Legal Brief",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [newDocument, setNewDocument] = useState<Partial<Document>>({})
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const { toast } = useToast()

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.case.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === "all" || doc.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const handleUploadDocument = () => {
    if (newDocument.name && newDocument.client && newDocument.case) {
      const document: Document = {
        id: Date.now().toString(),
        name: newDocument.name,
        type: newDocument.type || "PDF",
        size: "1.0 MB", // Placeholder
        client: newDocument.client,
        case: newDocument.case,
        uploadDate: new Date().toISOString().split("T")[0],
        category: (newDocument.category as Document["category"]) || "Other",
      }
      setDocuments([...documents, document])
      setNewDocument({})
      setIsUploadDialogOpen(false)

      toast({
        title: "Document Uploaded",
        description: `${document.name} has been successfully uploaded.`,
      })
    }
  }

  const handleDeleteDocument = (id: string) => {
    const document = documents.find((doc) => doc.id === id)
    setDocuments(documents.filter((doc) => doc.id !== id))

    toast({
      title: "Document Deleted",
      description: `${document?.name} has been deleted successfully.`,
    })
  }

  const handleDownloadDocument = async (document: Document) => {
    setDownloadingId(document.id)

    try {
      // Simulate download processing time
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate sample document content based on type
      let content = ""
      let mimeType = ""
      let fileExtension = ""

      switch (document.type.toLowerCase()) {
        case "pdf":
          content = `D-CASE Law Firm Document
Document: ${document.name}
Client: ${document.client}
Case: ${document.case}
Category: ${document.category}
Upload Date: ${document.uploadDate}

This is a sample ${document.category.toLowerCase()} document for ${document.client}.
The document contains important legal information related to ${document.case}.

Generated on: ${new Date().toLocaleString()}
File Size: ${document.size}
Document ID: ${document.id}`
          mimeType = "application/pdf"
          fileExtension = "pdf"
          break

        case "docx":
        case "doc":
          content = `D-CASE Law Firm Document

Document: ${document.name}
Client: ${document.client}
Case: ${document.case}
Category: ${document.category}
Upload Date: ${document.uploadDate}

This is a sample ${document.category.toLowerCase()} document for ${document.client}.
The document contains important legal information related to ${document.case}.

Generated on: ${new Date().toLocaleString()}
File Size: ${document.size}
Document ID: ${document.id}`
          mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          fileExtension = "docx"
          break

        case "txt":
          content = `D-CASE Law Firm Document
Document: ${document.name}
Client: ${document.client}
Case: ${document.case}
Category: ${document.category}
Upload Date: ${document.uploadDate}

This is a sample ${document.category.toLowerCase()} document for ${document.client}.
The document contains important legal information related to ${document.case}.

Generated on: ${new Date().toLocaleString()}
File Size: ${document.size}
Document ID: ${document.id}`
          mimeType = "text/plain"
          fileExtension = "txt"
          break

        case "zip":
          content = `D-CASE Law Firm Archive
Archive: ${document.name}
Client: ${document.client}
Case: ${document.case}
Category: ${document.category}
Upload Date: ${document.uploadDate}

This archive contains multiple files related to ${document.case}.
Archive Size: ${document.size}
Document ID: ${document.id}`
          mimeType = "application/zip"
          fileExtension = "zip"
          break

        default:
          content = `D-CASE Law Firm Document - ${document.name}`
          mimeType = "application/octet-stream"
          fileExtension = document.type.toLowerCase()
      }

      // Create and download the file
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${document.name.split(".")[0]}_downloaded.${fileExtension}`
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Download Successful",
        description: `${document.name} has been downloaded successfully.`,
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: `Failed to download ${document.name}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setDownloadingId(null)
    }
  }

  const handleViewDocument = (document: Document) => {
    // Simulate opening document in viewer
    toast({
      title: "Opening Document",
      description: `${document.name} is being opened in the document viewer.`,
    })
  }

  const getCategoryColor = (category: Document["category"]) => {
    switch (category) {
      case "Contract":
        return "bg-blue-100 text-blue-800"
      case "Evidence":
        return "bg-red-100 text-red-800"
      case "Legal Brief":
        return "bg-green-100 text-green-800"
      case "Court Filing":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFileIcon = (type: string) => {
    return <FileText className="w-8 h-8 text-blue-600" />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="md:text-2xl font-bold">Document Management</h1>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  value={newDocument.name || ""}
                  onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                  placeholder="Enter document name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={newDocument.client || ""}
                    onChange={(e) => setNewDocument({ ...newDocument, client: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <Label htmlFor="case">Case</Label>
                  <Input
                    id="case"
                    value={newDocument.case || ""}
                    onChange={(e) => setNewDocument({ ...newDocument, case: e.target.value })}
                    placeholder="Enter case name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">File Type</Label>
                  <Select onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="DOC">DOC</SelectItem>
                      <SelectItem value="TXT">TXT</SelectItem>
                      <SelectItem value="ZIP">ZIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewDocument({ ...newDocument, category: value as Document["category"] })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Evidence">Evidence</SelectItem>
                      <SelectItem value="Legal Brief">Legal Brief</SelectItem>
                      <SelectItem value="Court Filing">Court Filing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF, DOC, DOCX, TXT, ZIP up to 50MB</p>
              </div>
              <Button onClick={handleUploadDocument} className="w-full">
                Upload Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Evidence">Evidence</SelectItem>
            <SelectItem value="Legal Brief">Legal Brief</SelectItem>
            <SelectItem value="Court Filing">Court Filing</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{getFileIcon(document.type)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-2 truncate" title={document.name}>
                    {document.name}
                  </h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p>
                      <span className="font-medium">Client:</span> {document.client}
                    </p>
                    <p>
                      <span className="font-medium">Case:</span> {document.case}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span> {document.size}
                    </p>
                    <p>
                      <span className="font-medium">Uploaded:</span> {document.uploadDate}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge className={getCategoryColor(document.category)}>{document.category}</Badge>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{document.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => handleViewDocument(document)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownloadDocument(document)}
                  disabled={downloadingId === document.id}
                >
                  <Download className="w-4 h-4" />
                  {downloadingId === document.id ? "..." : ""}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteDocument(document.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No documents found matching your criteria.</p>
        </div>
      )}

      {/* Storage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
              <p className="text-sm text-gray-600">Total Documents</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">45.2 GB</p>
              <p className="text-sm text-gray-600">Storage Used</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-sm text-gray-600">This Month</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">100 GB</p>
              <p className="text-sm text-gray-600">Storage Limit</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
