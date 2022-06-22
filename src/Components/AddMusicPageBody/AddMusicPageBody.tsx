import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Text from "../Text/Text";

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  /* TODO: How to fix this? */
  height: 0;
`;

const BodyMainContainer = styled.div`
  display: flex;
  padding: 10px 0;
  margin: 0 auto;
  width: 50%;
  max-width: 400px;
  height: 100%;
`;

const TitleText = styled(Text)`
  font-size: 34px;
`;

const Label = styled.label`
  color: var(--primary-text-color);
  size: 14pt;
  margin: 0;
`;

const Input = styled.input``;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const HorInputContainer = styled(InputContainer)`
  flex-direction: row;
`;

const Select = styled.select``;

const Option = styled.option``;

const Form = styled.form``;

const Submit = styled.input``;

const Save = styled.button``;

function AddMusicPageBody() {
  const FormVar = useRef<HTMLFormElement>(null);

  const [isemail, setisemail] = useState(false);

  const [ishlink, setishlink] = useState(false);

  useEffect(() => {
    LoadF();
  });

  const LoadF = () => {
    if (FormVar.current == null) return;

    const json = localStorage.getItem("form");

    if (json == null) return;

    const inputs = FormVar.current.elements;

    const par: { [name: string]: string } = JSON.parse(json);

    for (let i = 0; i < inputs.length; i++) {
      const input: any = inputs[i];

      if (input.hasAttribute("name")) {
        const name = input.getAttribute("name");

        const value = par[name];

        if (name != null && value) input.value = value;
      }
    }
  };

  const SaveF = (e: any) => {
    e.preventDefault();
    if (FormVar.current == null) return;
    const inputs = FormVar.current.elements;

    console.log(inputs);

    const par: { [name: string]: string } = {};

    for (let i = 0; i < inputs.length; i++) {
      const input: any = inputs[i];

      if (input.hasAttribute("name")) {
        const name = input.getAttribute("name");

        if (name != null && input.value != null) par[name] = input.value;
      }
    }

    const json = JSON.stringify(par);
    localStorage.setItem("form", json);
  };

  const NoticeCheck = (e: any) => {
    setisemail(e.target.checked);
  };

  const HLinkCheck = (e: any) => {
    setishlink(e.target.checked);
  };

  return (
    <BodyMainContainer>
      <BodyContainer>
        <TitleText>Request track</TitleText>
        <Form ref={FormVar}>
          <InputContainer>
            <Label>Track Name</Label>
            <Input required name="trackName" type="text"></Input>
          </InputContainer>
          <InputContainer>
            <Label>Author</Label>
            <Input required name="authorName" type="text"></Input>
          </InputContainer>
          <InputContainer>
            <Label>Album</Label>
            <Input required name="albumName" type="text"></Input>
          </InputContainer>
          <InputContainer>
            <Label>Genre</Label>
            <Select id="genreName" name="genres">
              <Option value="pop">Pop</Option>
              <Option value="hiphop">Hip-Hop</Option>
              <Option value="rock">Rock</Option>
              <Option value="techno">Techno</Option>
            </Select>
          </InputContainer>
          <InputContainer>
            <Label>Year:</Label>
            <Input
              type="number"
              name="trackYear"
              max={new Date().getFullYear()}
            ></Input>
          </InputContainer>
          <HorInputContainer>
            <Label>I have link on track:</Label>
            <Input onChange={HLinkCheck} type="checkbox"></Input>
          </HorInputContainer>
          {ishlink ? (
            <InputContainer>
              <Label>Link</Label>
              <Input required name="link" type="url"></Input>
            </InputContainer>
          ) : (
            <></>
          )}
          <HorInputContainer>
            <Label>Notice me:</Label>
            <Input onChange={NoticeCheck} type="checkbox"></Input>
          </HorInputContainer>
          {isemail ? (
            <>
              <InputContainer>
                <Label>Email</Label>
                <Input name="email" type="email"></Input>
              </InputContainer>
              <Label>Or</Label>
              <InputContainer>
                <Label>Skype</Label>
                <Input name="skype" type="text" minLength={5}></Input>
              </InputContainer>
            </>
          ) : (
            <></>
          )}
          <Submit type="submit" value="Submit"></Submit>
          <Save onClick={SaveF}>Save</Save>
        </Form>
      </BodyContainer>
    </BodyMainContainer>
  );
}

export default AddMusicPageBody;
