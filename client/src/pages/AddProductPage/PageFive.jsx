import { Title, Button } from "@mantine/core";

export function PageFive({
    formData,
    setFormData,
    page,
    setPage,
    handleSubmit,
}) {
    return (
        <div className="page">
            <Title
                sx={{
                    textAlign: "center",
                }}
                order={2}
            >
                Summary
            </Title>
            <br />
            <div className="summary">
                <h3> </h3>
                <h3> </h3>
                <h3>Purchase Price: </h3>
                <h3>Rental Rate: </h3>
            </div>
            <br />
            <div className="bottomSection">
                {/* Next or submit button */}
                <Button color="violet" onClick={handleSubmit}>
                    Submit
                </Button>
                {/* Back Button */}
                <Button color="red" onClick={() => setPage(page - 1)}>
                    Back
                </Button>
            </div>
        </div>
    );
}
