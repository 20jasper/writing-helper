import { For, ParentComponent, type Component } from "solid-js";
import ContextMenu from "@/components/ContextMenu";

const InlineError: ParentComponent = (props) => {
  return (
    <ContextMenu>
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
  spans: { kind: "ok" | "error"; start: number; end: number }[];
};
const TextEditor: Component<{ lines: Line[] }> = (props) => {
  return (
    <div
      contenteditable={true}
      role="textbox"
      aria-multiline="true"
      class="mx-auto max-w-prose my-2 border-2 p-4"
      title="Rich Text Editor"
    >
      <For each={props.lines}>
        {({ text, spans }) => {
          return (
            <p>
              <For each={spans}>
                {({ kind, start, end }) => {
                  const slice = text.slice(start, end);
                  return kind === "ok" ? (
                    <>{slice}</>
                  ) : (
                    <InlineError>{slice}</InlineError>
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
  const text: Line[] = [
    { text: "hello", spans: [{ start: 0, end: Infinity, kind: "ok" }] },
    {
      text: "gamer hello cool is hello",
      spans: [
        { start: 0, end: 5, kind: "ok" },
        { start: 5, end: 17, kind: "error" },
        { start: 17, end: 19, kind: "ok" },
        { start: 19, end: Infinity, kind: "error" },
      ],
    },
  ];
  return (
    <main>
      <h1 class="text-center text-xl py-2">Writing Helper</h1>
      <TextEditor lines={text} />
    </main>
  );
};

export default App;
