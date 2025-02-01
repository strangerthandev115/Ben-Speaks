class speechButton {
  id: number;
  label: string;
  speech_phrase: string;
  image: Uint8Array | null = null;

  constructor(
    id: number,
    label: string,
    speech_phrase: string,
    image: Uint8Array | null = null
  ) {
    this.id = id;
    this.label = label;
    this.speech_phrase = speech_phrase;
    this.image = image;
  }
}

export default speechButton;
