import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuPortal,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ParentComponent } from "solid-js";

const ContextMenuDemo: ParentComponent<{ error: string }> = (props) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger class="inline">{props.children}</ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent class="w-60">
          <h2 class="font-bold">Grammar Error</h2>
          <p>{props.error}</p>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};

export default ContextMenuDemo;
