import { createSignal, For, ParentComponent, type Component } from "solid-js";
import ContextMenu from "@/components/ContextMenu";
import { Button } from "./components/ui/button";

const InlineError: ParentComponent<{ error: string }> = (props) => {
  return (
    <ContextMenu error={props.error}>
      <span
        id="error"
        class="underline decoration-red-500 decoration-2"
        aria-invalid="grammar"
      >
        {props.children}
      </span>
    </ContextMenu>
  );
};

type Line = {
  text: string;
  spans: { error: string | null; start: number; end: number }[];
};

const TextEditor: Component<{
  lines: Line[];
  ref: HTMLDivElement | undefined;
}> = (props) => {
  return (
    <div
      contenteditable={true}
      role="textbox"
      aria-multiline="true"
      class="mx-auto w-3/6 my-2 border-2 p-4 h-90"
      title="Rich Text Editor"
      ref={props.ref}
    >
      <For each={props.lines}>
        {({ text, spans }) => {
          return (
            <p>
              <For each={spans}>
                {({ error, start, end }) => {
                  const slice = text.slice(start, end);
                  return !error ? (
                    <>{slice}</>
                  ) : (
                    <InlineError error={error}>{slice}</InlineError>
                  );
                }}
              </For>
            </p>
          );
        }}
      </For>
    </div>
  );
};

const App: Component = () => {
  const text2: Line[] = [
    { text: "hello", spans: [{ start: 0, end: Infinity, error: null }] },
    {
      text: "gamer hello cool is hello",
      spans: [
        { start: 0, end: 5, error: null },
        { start: 5, end: 17, error: "uh oh broken" },
        { start: 17, end: 19, error: null },
        { start: 19, end: Infinity, error: "uh oh broken" },
      ],
    },
  ];

  const [text, setText] = createSignal(text2);
  let editor: HTMLDivElement | undefined;

  const fetchLines = async () => {
    console.log("text from editor\n---\n", editor.innerText);
    const data = await fetch("http://localhost:3003/test", {
      method: "POST",
      body: JSON.stringify(editor.innerText.split("\n")),
    });
    const json = await data.json();

    console.log(json);

    setText(json);
  };

  return (
    <main class="flex flex-col justify-center items-center">
      <h1 class="text-center text-xl py-2">Writing Helper</h1>
      <TextEditor ref={editor} lines={text()} />
      <Button onClick={fetchLines}>Check for Errors</Button>
    </main>
  );
};

export default App;
