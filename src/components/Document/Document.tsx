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
  };

  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const [currentDocument, setCurrentDocument] =
    useState<DocumentData>(document);
  const [refreshDocument, setRefreshDocument] = useState(false);

  // use effect that loads when the component mounts and sets the current document
  // to the document that was passed in through the location state
  useEffect(() => {
    setCurrentDocument(document);
  }, [document]);

  // use effect that loads when the refreshDocument state changes
  // and fetches the updated document from the API
  useEffect(() => {
    console.log(`selectedDocumentID: ${selectedDocumentID}`)
    const fetchDocument = async () => {
      const response = await fetch(
        `https://n2v4kawif7.execute-api.us-east-1.amazonaws.com/dev/documents/${selectedDocumentID}`
      );
      const data = await response.json();
      setCurrentDocument(data);
    };
    if (refreshDocument){
      fetchDocument();
      setRefreshDocument(false);
    }
  }, [refreshDocument, selectedDocumentID]);

  return (
    <div className="container mx-auto my-8 text-center text-white">
      {/* Document Information */}
      <h2 className="text-2xl font-bold mb-4">{currentDocument.DocumentName}</h2>
      <div className="document-info-container my-8 p-4 border rounded">
        <div className="flex justify-between">
          {/* Document Details */}
          <div className="document-details text-left">
            <p>
              Category:<strong> {currentDocument.DocumentCategory}</strong>
            </p>
            <p>
              Type:<strong> {currentDocument.DocumentType}</strong>
            </p>
            <p>
              Course:
              <strong> {currentDocument.CourseId}</strong>
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
          {/* Additional Information */}
          <div className="additional-info w-1/2 text-left">
            Additional Information:
            <p className="w-full h-24">
              <strong>{currentDocument.TopicAdditionalInfo}</strong>
            </p>
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
            src={currentDocument.DocumentURL}
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
          categoryId={currentDocument.DocumentCategory}
          documentType={currentDocument.DocumentType}
          courseName={currentDocument.CourseId}
          gradeLevel={currentDocument.GradeLevel}
          topicAdditional={currentDocument.TopicAdditionalInfo}
          aptitudeLevel={currentDocument.AptitudeLevel}
          embedURL={currentDocument.DocumentURL}
          courseID={currentDocument.CourseId}
          userEmail={currentDocument.UserEmail}
          documentId={currentDocument.DocumentId}
          mode = "edit"
          onClose={() => {
            setRefreshDocument(true);
            setShowDocumentModal(false)}}
        />
      )}
    </div>
  );
};

export default Document;
