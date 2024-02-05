import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgProgress, NgProgressModule, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [NgProgressModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent {
  selectedFile: File | null = null;

  progressRef!: NgProgressRef;

  constructor(private http: HttpClient, private progress: NgProgress) {}

  ngOnInit(): void {
    this.progressRef = this.progress.ref('myProgress');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onUpload() {
    if (this.selectedFile) {
      this.progressRef.start();
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http
        .post('http://localhost:3000/upload', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .subscribe(
          (event) =>{
            if(event.type === HttpEventType.UploadProgress) {
              if(event.total){
                const parcentDone = Math.round((100 * event.loaded) / event.total);
                this.progressRef.set(parcentDone);
              }
            }else if (event.type === HttpEventType.Response){
              console.log('Funcionando');
              this.progressRef.complete();
            }
          }
        );
    }
  }
}
