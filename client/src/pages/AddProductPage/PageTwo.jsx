import { Title, Textarea, Button } from "@mantine/core";
import { useState } from "react";


export function PageTwo({
    formData,
    setFormData,
    page,
    setPage,
}) {


    const [inputDescription, setInputDescription] = useState(formData.description);
      
    function handleNextPage() {
        setPage(page + 1);
        setFormData({
          ...formData,
          description: inputDescription
      });
      console.log({ inputDescription, formData });
    }

    return (
        <div className="page">
            <Title
                sx={{
                    textAlign: "center",
                }}
                order={2}
            >
                Write a simple Description
            </Title>
            <br />
            <Textarea placeholder="Description" 
                required 
                value={inputDescription}
                onChange={(e) => {
                    setInputDescription(e.target.value);
                }}
            />
            <br />
            <div className="bottomSection">
                {/* Next or submit button */}
                <Button color="violet" onClick={handleNextPage}>
                    Next
                </Button>
                {/* Back Button */}
                <Button color="red" onClick={() => setPage(page - 1)}>
                    Back
                </Button>
            </div>
        </div>
    );
}
