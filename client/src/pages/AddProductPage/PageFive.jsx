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
                <h2> {formData.title} </h2>
                <h3> {formData.description} </h3>
                <h3>Purchase Price: {formData.price}</h3>
                <h3>Rental Rate: {formData.rentPrice} per {formData.rentDuration} </h3>
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
