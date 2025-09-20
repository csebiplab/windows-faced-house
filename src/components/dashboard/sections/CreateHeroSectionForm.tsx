interface CreateHeroSectionFormProps {
  kind: string;
}

const CreateHeroSectionForm = ({ kind }: CreateHeroSectionFormProps) => {
  return <div>{kind}</div>;
};

export default CreateHeroSectionForm;
