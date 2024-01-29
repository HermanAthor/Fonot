import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export function DietOptions({ handleChange }) {
  return (
    <RadioGroup defaultValue="public" onChange={handleChange}>
      <div className="flex sm:flex-col md:flex-row md:gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="vegetarian" id="veg" />
          <Label htmlFor="veg">Vegetarian</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="meat" id="meat" />
          <Label htmlFor="meat">Meatarian</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="vegan" id="vegan" />
          <Label htmlFor="vegan">Vegan</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="diverse" id="diverse" />
          <Label htmlFor="diverse">Diverse</Label>
        </div>
      </div>
    </RadioGroup>
  );
}

export function PrivateOrPublic({ handleChange }) {
  return (
    <RadioGroup defaultValue="public" onChange={handleChange}>
      <div className="flex flex-col lg:flex-row ">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="r2" />
          <Label htmlFor="r2">Public</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="r3" />
          <Label htmlFor="r3">Private</Label>
        </div>
      </div>
    </RadioGroup>
  );
}
