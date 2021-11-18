import { Component, OnInit, Inject } from '@angular/core';
import * as Editor from './ckeditor'
import {Store} from "@ngrx/store";
import {createBlog, selectUser} from "../state";
import {FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms'

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  Editor = Editor
  uid: string | undefined
  story: FormGroup
  editorConfig = {
    language: 'en',
    simpleUpload: {
    uploadUrl: `${this.url}/api/image`,
    }
  };
  constructor(@Inject('API_URL') private url: string, private fb: FormBuilder, private store: Store) {
    this.story = fb.group({
      imageUrl: [''],
      body: [''],
      title: [''],
      tags: [''],
      language: [''],
      writer: ['']
    })
  }
  getFile(event: any){
    this.story.get('imageUrl')?.setValue(event.target.files[0])
  }

  ready(editor: any){
     editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
  }

  send(story: FormGroup){
    let fd = new FormData()
    fd.append('title', this.story.get('title')?.value)
    fd.append('tags', this.story.get('tags')?.value)
    fd.append('language', this.story.get('language')?.value)
    fd.append('imageUrl', this.story.get('imageUrl')?.value)
    fd.append('body', this.story.get('body')?.value)
    if(!this.uid){
      fd.append('writer', this.story.get('writer')?.value)
    }
    else{
      fd.append('author', this.uid)
    }
    this.store.dispatch(createBlog({body: fd}))
  }

  ngOnInit(): void {
    this.store.select(selectUser).subscribe(user => this.uid = user.id)
  }

}
