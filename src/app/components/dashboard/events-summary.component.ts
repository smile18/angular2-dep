import {Component, OnInit} from "@angular/core";
import {Message, TreeNode} from "primeng/components/common/api";
import {NodeService} from "./node.service";

@Component({
  templateUrl: 'events-summary.component.html'
})
export class EventsSummaryCompoent implements OnInit{

  msgs: Message[];
  files: TreeNode[];

  files1: TreeNode[];

  files2: TreeNode[];

  files3: TreeNode[];

  files4: TreeNode[];

  lazyFiles: TreeNode[];

  selectedFile: TreeNode;

  selectedFiles: TreeNode[];

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.nodeService.getFilesystem().then(files => this.files = files);
    this.nodeService.getLazyFilesystem().then(files => this.lazyFiles = files);
  }

  nodeSelect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.data.name});
  }

  nodeUnselect(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.data.name});
  }

  nodeExpand(event) {
    if(event.node) {
      //in a real application, make a call to a remote url to load children of the current node and add the new nodes as children
      this.nodeService.getLazyFilesystem().then(nodes => event.node.children = nodes);
    }
  }

}
