import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {DomSanitizer} from "@angular/platform-browser";

/**
 *  This class represents the lazy loaded HomeComponent.
 */


interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  source: any;

}

@Component({
  moduleId: module.id,
  selector: 'home-cmp',
  templateUrl: 'home.component.html',
  styles: [`




  `],
})

export class HomeComponent {


  ngAfterViewInit() {

    console.log("after view");
    /* this.canvas.width = this.canvas.offsetWidth;
     this.canvas.height = this.canvas.offsetHeight;*/

  }

  @Input('barchart-data') data: number[];
  @Input('width') width: number;
  @Input('height') height: number;
  @Input('colors') colors: string[];
  @Input('Rect') rectangles: Rect[];
  private canvas: any;
  private invoice: any;
  private ctx: any;
  @ViewChild('canvas') canvasRef: ElementRef;
  @ViewChild('invoice') invoiceRef: ElementRef;

  private rects: Rect[];
  netImage: string;
  /*= 'data:image/jpg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAANAAkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQsr2zi8CW97G3iGLWjHxeh7gQB88MzMfL2dM+2a9N/tSf/oMaT/31/wDZVwOhX2ry6LB4ThubOK3eI232g2rM4VsgnG/Gea2f+FN+HP8Anvf/APf7/wCtXuYqNJVGqrtq7ddP0OODlb3T/9k=';
*/

  private rectangle: Rect[];

  /*constructor(private _http: Http) {
    console.log("called2");
/!*    this.getMyBlog(this.rects);*!/
  }*/
  constructor(private _http: Http, private sanitizer: DomSanitizer) {
    this.getMyBlog(this.rects);
  }

  sanitizedUrl: any;

  ngOnInit() {
    /*
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.netImage);
    */
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  private getMyBlog(rectangle: Rect[]) {
    this._http.get('http://localhost:8080/invoice-manager-web/rest/hello')
      .map(res => (res.json()as Rect[]))
      .subscribe(data => {
        this.rectangle = data;
        console.log("loaddata");
        console.log(data);

        this.canvas = this.canvasRef.nativeElement;
        this.invoice = this.invoiceRef.nativeElement;

        /*this.canvas.width = 1654;*/
        console.log(this.canvas.width);
        console.log("invoice width: ", this.invoice.width);

        this.canvas.width = this.invoice.width;
        this.canvas.height = this.invoice.height;

        /*  this.canvas.height = 792;*/
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#ff0000"

        this.invoice.source = "data:image/png;base64," + this.rectangle[0].source;

        /* this.preview = "data:image/jpg;base64," + this.rectangle[0].source;*/

        /* this.preview = "data:image/jpg;base64," + this.rectangle[0].source;*/

        /*this.netImage = "data:image/jpg;base64," + this.rectangle[0].source;*/
        /*
        this.preview ="
        'data:image/jpg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAANAAkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQsr2zi8CW97G3iGLWjHxeh7gQB88MzMfL2dM+2a9N/tSf/oMaT/31/wDZVwOhX2ry6LB4ThubOK3eI232g2rM4VsgnG/Gea2f+FN+HP8Anvf/APf7/wCtXuYqNJVGqrtq7ddP0OODlb3T/9k='";
        */


        console.log(this.rectangle.length);
        console.log(this.rectangle[1].source);
        /*  this.ctx.fillRect(100,100, 100, 100);
          this.ctx.fill()*/

        this.draw();
      });
  }

  draw() {
    console.log("draw called");
    const c = this.ctx;
    c.fillStyle = "rgba(255, 255, 255, 1)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    /*
        c.translate(0.5, 0.5);
    */

    c.fillStyle = "#ff0000";
    c.strokeStyle = "#ff0000";

    var imgWidth: number;
    imgWidth = 1654;
    var imgHeight: number;
    imgHeight = 792;
  /*  let percentWidth = (this.invoice.width / imgWidth ) * 100;
    let percentHeight = (this.invoice.height / imgHeight ) * 100;*/
    for (var i = 0; i < this.rectangle.length; i++) {

      /*image.src = "data:image/jpg;base64," + this.rectangle[i].source;*/
      var r = this.rectangle[i];
      /* c.rect(r.x / 100 * percentWidth, r.y / 100 * percentHeight, r.width / 100 * percentWidth, r.height / 100 * percentHeight);*/

      /*(function(){*/



        var  image = new Image();
        (function(ctx, image,r) {
          image.onload = function() {
            c.drawImage(image,r.x ,r.y);
          }
          image.src = "data:image/jpg;base64," + r.source;
        })(this.ctx, image,r);


     /* var image = new Image();


      /!*console.log("src: " + image.src);*!/
      image.onload = function () {
       /!* console.log("onload");*!/
        c.drawImage(image,r.x / 100 * percentWidth, r.y / 100 * percentHeight);

      };
        image.src = "data:image/jpg;base64," + this.rectangle[i].source;*/


/*
      });*/
      /*

      image.src = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAANAAkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDQsr2zi8CW97G3iGLWjHxeh7gQB88MzMfL2dM+2a9N/tSf/oMaT/31/wDZVwOhX2ry6LB4ThubOK3eI232g2rM4VsgnG/Gea2f+FN+HP8Anvf/APf7/wCtXuYqNJVGqrtq7ddP0OODlb3T/9k=';
*/

    }

    /*c.rect(100,100,100,100);*/

  }

   onResize() {

     // Not a good thing to do but will get you going.
     // I need to look into the Renderer service instead.
   /*  const canvasElement = this.canvas.nativeElement;

     // These don't change (canvas intrinsic dimensions)
     this.canvas.width = this.invoice.width;
     this.canvas.height = this.invoice.height;

     // These will change (scaling applied by the style)
     const computedStyles = getComputedStyle(this.canvas);
     const computedWidth = computedStyles.width;
     const computedHeight = computedStyles.height;
     const c = this.ctx;
     c.fillStyle = "rgba(0, 0, 0, 0)"
     /!*c.fillRect(0,0,200,200);
     console.log("on resize ", computedWidth);
     c.clearRect(0, 0, this.canvas.width, this.canvas.height);
     c.fill();

     c.translate(0.5, 0.5);


     c.strokeStyle = "#00cc00";

     var imgWidth: number;
     imgWidth = 1654;
     var imgHeight: number;
     imgHeight = 792;
     let percentWidth = (this.invoice.width / imgWidth ) * 100;
     let percentHeight = (this.invoice.height / imgHeight ) * 100;
     for (var i = 0; i < this.rectangle.length; i++) {

       var r = this.rectangle[i];
       c.rect(r.x / 100 * percentWidth, r.y / 100 * percentHeight, r.width / 100 * percentWidth, r.height / 100 * percentHeight);
     }
     c.stroke();
     c.rect(100,100,100,100);


 */
   }
}
