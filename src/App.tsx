import {
  createSignal,
  For,
  ParentComponent,
  Switch,
  type Component,
} from "solid-js";
import ContextMenu from "@/components/ContextMenu";
import { Button } from "./components/ui/button";

const InlineError: ParentComponent<{ error: string }> = (props) => {
  return (
    <ContextMenu error={props.error}>
      <span
        id="error"
        class="bg-[url(/squiggly-boy.svg)] bg-[0_calc(100%_+_1px)] bg-repeat-x"
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
      class="mx-auto w-3/6 my-2 border-2 p-4 h-90 whitespace-pre-wrap"
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
    const text = editor.innerText.split("\n\n");
    console.log(text);
    const data = await fetch("http://localhost:3003/test", {
      method: "POST",
      body: JSON.stringify(text),
    });
    const json = await data.json();

    console.log(json);

    setText(json.map(([_, x]) => x));
  };

  // let select: HTMLSelectElement | undefined;

  return (
    <main class="flex flex-col justify-center items-center">
      <h1 class="text-center text-xl py-2">Writing Helper</h1>
      <TextEditor ref={editor} lines={text()} />
      <Button onClick={fetchLines}>Check for Errors</Button>
      {/* <select ref={select}>
        <option value="capitals">Capitals</option>
        <option value="glue">Glue</option>
      </select> */}
    </main>
  );
};

export default App;
