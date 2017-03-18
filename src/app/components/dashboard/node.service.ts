import {TreeNode} from "primeng/components/common/api";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class NodeService {

  constructor(private http: Http) {}

  getFilesystem() {
    return this.http.get('/components/dashboard/filesystem.json')
      .toPromise()
      .then(res => <TreeNode[]> res.json().data)
      .then(data => { return data; });
  }

  getLazyFilesystem() {
    return this.http.get('/components/dashboard/filesystem.json')
      .toPromise()
      .then(res => <TreeNode[]> res.json().data)
      .then(data => { return data; });
  }
}
