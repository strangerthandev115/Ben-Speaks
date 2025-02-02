class speechButton {
  id: number;
  label: string;
  speech_phrase: string;
  image: string | null = null;

  constructor(
    id: number,
    label: string,
    speech_phrase: string,
    image: string | null = null
  ) {
    this.id = id;
    this.label = label;
    this.speech_phrase = speech_phrase;
    this.image = image;
  }
}

export default speechButton;
