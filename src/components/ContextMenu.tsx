import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuPortal,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ParentComponent } from "solid-js";

const ContextMenuDemo: ParentComponent = (props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger class="inline">{props.children}</ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent class="w-60">
          <h2 class="font-bold">Grammar Error</h2>
          <p>Consider doing x instead of y.</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore eos
            minus illum beatae, eius delectus laboriosam! Quae repellat
            molestiae omnis tenetur officiis. Laboriosam, quaerat? Numquam
            commodi consectetur eaque repellendus labore.
          </p>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};

export default ContextMenuDemo;
