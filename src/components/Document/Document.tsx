import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import CreateDocumentModal from "../CreateDocumentModal/CreateDocumentModal";

interface DocumentProps {
  isLoggedIn: boolean;
}

interface DocumentData {
  DocumentId: string;
  DocumentName: string;
  DocumentCategory: string;
  DocumentType: string;
  GradeLevel: string;
  AptitudeLevel: string;
  TopicAdditionalInfo: string;
  AI_Prompt: string;
  DocumentURL: string;
  CourseId: string;
  UserEmail: string;
  CreatedAt: string;
  LastModified: string;
  CourseName: string;
}

const Document: React.FC<DocumentProps> = ({ isLoggedIn }) => {
  const location = useLocation();
  const { documents, selectedDocumentID } = (location.state as {
    documents: DocumentData[];
    selectedDocumentID: string;
  }) || {
    documents: [],
    selectedDocumentID: "",
  };

  console.log(`selectedDocumentID: ${selectedDocumentID}`);
  console.log(`documents: ${JSON.stringify(documents)}`);
  const document = documents.find(
    (doc) => doc.DocumentId === selectedDocumentID
  ) || {
    // ... default empty document object
    DocumentId: "",
    DocumentName: "",
    DocumentCategory: "",
    DocumentType: "",
    GradeLevel: "",
    AptitudeLevel: "",
    TopicAdditionalInfo: "",
    AI_Prompt: "",
    DocumentURL: "",
    CourseId: "",
    UserEmail: "",
    CreatedAt: "",
    LastModified: "",
    CourseName: "",
  };

  console.log(`document: ${JSON.stringify(document)}`);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const [currentDocument, setCurrentDocument] =
    useState<DocumentData>(document);
  const [refreshDocument, setRefreshDocument] = useState(false);
  console.log(`currentDocument: ${JSON.stringify(currentDocument)}`);

  // Function to handle document selection from dropdown
  const handleDocumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoc = documents.find(
      (doc) => doc.DocumentId === e.target.value
    );
    if (selectedDoc) {
      setCurrentDocument(selectedDoc);
    }
  };

  // use effect that loads when the component mounts and sets the current document
  // to the document that was passed in through the location state
  useEffect(() => {
    setCurrentDocument(document);
  }, [document]);

  // use effect that loads when the refreshDocument state changes
  // and fetches the updated document from the API
  useEffect(() => {
    console.log(`selectedDocumentID: ${selectedDocumentID}`);
    const fetchDocument = async () => {
      const response = await fetch(
        `https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/documents/${selectedDocumentID}`
      );
      const data = await response.json();
      setCurrentDocument(data);
    };
    if (refreshDocument) {
      fetchDocument();
      setRefreshDocument(false);
    }
  }, [refreshDocument, selectedDocumentID]);

  return (
    <div className="container mx-auto my-8 text-center text-white">
      <div className="document-info-container my-8 p-4 border rounded w-1/3">
        <div className="flex justify-between">
          {/* Document Details */}
          <div className="document-details text-left">
            Document: 
            <select
              value={currentDocument.DocumentId}
              onChange={handleDocumentChange}
              className="border rounded p-2 text-black h-10"
            >
              {documents.map((doc) => (
                <option key={doc.DocumentId} value={doc.DocumentId}>
                  {doc.DocumentName}
                </option>
              ))}
            </select>
            <p>
              Category:<strong> {currentDocument.DocumentCategory}</strong>
            </p>
            <p>
              Type:<strong> {currentDocument.DocumentType}</strong>
            </p>
            <p>
              Course:
              <strong> {currentDocument.CourseName}</strong>
            </p>
            <p>
              Grade Level:
              <strong> {currentDocument.GradeLevel}</strong>
            </p>
            <Button
              text="Edit"
              bgColor="bg-yellow-300"
              textColor="text-indigo-900"
              onClick={() => setShowDocumentModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Embedded Document */}
      <div
        className="document-embed-container my-8 mx-auto"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        {currentDocument.DocumentURL.startsWith("https://docs.google.com") ? (
          <iframe
            src={currentDocument.DocumentURL + "?embedded=true"}
            width="100%"
            height="600px"
            title={currentDocument.DocumentName}
            style={{ border: "none" }}
          ></iframe>
        ) : (
          <p>Invalid or missing document URL.</p>
        )}
      </div>

      {showDocumentModal && (
        <CreateDocumentModal
          documentName={currentDocument.DocumentName}
          categoryName={currentDocument.DocumentCategory}
          documentType={currentDocument.DocumentType}
          courseName={currentDocument.CourseId}
          gradeLevel={currentDocument.GradeLevel}
          topicAdditional={currentDocument.TopicAdditionalInfo}
          aptitudeLevel={currentDocument.AptitudeLevel}
          embedURL={currentDocument.DocumentURL}
          courseID={currentDocument.CourseId}
          userEmail={currentDocument.UserEmail}
          documentId={currentDocument.DocumentId}
          mode="edit"
          onClose={() => {
            setRefreshDocument(true);
            setShowDocumentModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Document;
