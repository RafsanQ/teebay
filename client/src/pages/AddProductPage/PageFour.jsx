import { Title, NumberInput, Grid, Select, Button } from "@mantine/core";
import { useState } from "react";

export function PageFour({
    formData,
    setFormData,
    page,
    setPage,
}) {

    const [ priceInfo, setPriceInfo] = useState( {price: formData.price, rentPrice: formData.rentPrice, rentDuration: formData.rentDuration } )

    async function handleNextPage() {
      setFormData({
          ...formData,
          price: priceInfo.price,
          rentPrice: priceInfo.rentPrice,
          rentDuration: priceInfo.rentDuration
      })
      setPage(page + 1);
  }


    return (
        <div className="page">
            <Title
                sx={{
                    textAlign: "center",
                }}
                order={2}
            >
                Select Price
            </Title>
            <br />
            <NumberInput
                className="priceInput"
                icon={"Tk. "}
                placeholder="Purchase Price"
                value={priceInfo.price}
                onChange={(e) => setPriceInfo({
                  ...priceInfo,
                  price: e
                })}
                min={0}
                required
            />

            <Grid grow className="rentStuff">
                <Grid.Col span={1}>
                    <NumberInput 
                        icon={"Tk. "}
                        placeholder="Rental Price" 
                        value={priceInfo.rentPrice}
                        onChange={(value) => setPriceInfo({
                          ...priceInfo,
                          rentPrice: value
                        })}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Select
                        placeholder="Rate"
                        data={[
                            { value: "hour", label: "per Hour" },
                            { value: "day", label: "per Day" },
                            { value: "week", label: "per Week" },
                            { value: "month", label: "per Month" },
                        ]}
                        value={priceInfo.rentDuration}
                        onChange={(value) => setPriceInfo({
                          ...priceInfo,
                          rentDuration: value
                        })}
                    />
                </Grid.Col>
            </Grid>
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
