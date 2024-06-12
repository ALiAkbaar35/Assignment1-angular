import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  Vid: number = 0;
  Cid: number = 0;
  Pid: number = 0;
  Price: number = 0;
  ProductId: number = 0;
  MaxPrice: number = 0;
  ProductName: string = '';
  CatName: string = '';
  VenName: string = '';
  Vname: string = '';
  Cname: string = '';
  Pname: string = '';
  tel: string = '';
  VendorId: string = '';
  CategoryId: string = '';
  status: string = '';
  Vcond: boolean = false;
  Ccond: boolean = false;
  Pcond: boolean = false;
  VendorDialog: boolean = false;
  CategoryDialog: boolean = false;
  MaxDialog: boolean = false;
  NameDialog: boolean = false;
  IddelDialog: boolean = false;
  isDialogOpen: boolean = false;
  vendor: { id: number; name: string; tel: string }[] = [];
  Category: { id: number; name: string; status: string }[] = [];
  Product: {
    id: number;
    name: string;
    VendorId: string;
    CategoryId: string;
    Price: number;
  }[] = [];
  filterProduct: {
    id: number;
    name: string;
    VendorId: string;
    CategoryId: string;
    Price: number;
  }[] = [];

  generateToken(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
  getVendorName(vendorId: string): string {
    const vendor = this.vendor.find(
      (vendor) => vendor.id === parseInt(vendorId)
    );
    return vendor ? vendor.name : 'Unknown';
  }

  getCategoryName(CategoryId: string): string {
    const Category = this.Category.find(
      (cat) => cat.id === parseInt(CategoryId)
    );
    return Category ? Category.name : 'Unknown';
  }
  genVenID() {
    this.Vid = this.generateToken();
  }

  genCatID() {
    this.Cid = this.generateToken();
  }

  genProID() {
    this.Pid = this.generateToken();
  }

  resetVendor() {
    this.Vid = 0;
    this.Vname = '';
    this.tel = '';
  }

  resetCategory() {
    this.Cid = 0;
    this.Cname = '';
    this.status = '';
  }

  resetProduct() {
    this.Pid = 0;
    this.Pname = '';
    this.VendorId = '';
    this.CategoryId = '';
    this.Price = 0;
  }

  subVendor() {
    this.Vcond = this.vendor.some(
      (ven) =>
        ven.id === this.Vid ||
        ven.name.toLowerCase() === this.Vname.toLowerCase()
    );

    if (this.Vcond) {
      alert('Vendor Name Or Id Already Exist');
    } else if (this.Vname.length > 10) {
      alert('Name length should be less than 10');
    } else if (!this.Vname) {
      alert("Name can't be blank");
    } else if (this.tel.length > 12) {
      alert('Number length should be less than 12');
    } else if (!this.tel) {
      alert("Number can't be blank");
    } else {
      const tempVend = {
        id: this.Vid,
        name: this.Vname,
        tel: this.tel,
      };
      this.vendor.push(tempVend);
      this.resetVendor();
    }
  }

  subCategory() {
    this.Ccond = this.Category.some(
      (cat) =>
        cat.id === this.Cid ||
        cat.name.toLowerCase() === this.Cname.toLowerCase()
    );

    if (this.Ccond) {
      alert('Category Name Or Id Already Exist');
    } else if (this.Cname.length > 10) {
      alert('Name length should be less than 10');
    } else if (!this.Cname) {
      alert("Name can't be blank");
    } else if (!this.status) {
      alert('Status must be selected');
    } else {
      const tempCategory = {
        id: this.Cid,
        name: this.Cname,
        status: this.status,
      };
      this.Category.push(tempCategory);
      this.resetCategory();
    }
  }

  subProduct() {
    this.Pcond = this.Product.some(
      (prod) =>
        prod.id === this.Pid ||
        prod.name.toLowerCase() === this.Pname.toLowerCase()
    );
    if (this.Pcond) {
      alert('Product Name Or Id Already Exist');
    } else if (this.Pname.length > 10) {
      alert('Name length should be less than 10');
    } else if (!this.Pname) {
      alert("Name can't be blank");
    } else if (this.Price < 0) {
      alert('Price should be a positive number.');
    } else if (!this.Price) {
      alert("Price can't be blank");
    } else if (!this.VendorId) {
      alert('vendor must be selected');
    } else if (!this.CategoryId) {
      alert('Category must be selected');
    } else {
      const tempProduct = {
        id: this.Pid,
        name: this.Pname,
        VendorId: this.VendorId,
        CategoryId: this.CategoryId,
        Price: this.Price,
      };
      this.Product.push(tempProduct);
      this.filterProduct = this.Product;
      this.resetProduct();
    }
  }

  showModal() {
    this.isDialogOpen = true;
  }
  showdelModal() {
    this.IddelDialog = true;
  }
  showNameModal() {
    this.NameDialog = true;
  }
  showMaxModal() {
    this.MaxDialog = true;
  }
  showVendorModal() {
    this.VendorDialog = true;
  }
  showCategoryModal() {
    this.CategoryDialog = true;
  }
  onCancel() {
    if (this.isDialogOpen || this.IddelDialog) {
      this.ProductId = 0;
    }

    if (this.NameDialog) {
      this.ProductName = '';
    }
    if (this.VendorDialog) {
      this.VenName = '';
    }
    if (this.CategoryDialog) {
      this.CatName = '';
    }
    this.VendorDialog = false;
    this.CategoryDialog = false;
    this.isDialogOpen = false;
    this.IddelDialog = false;
    this.NameDialog = false;
    this.MaxDialog = false;
  }
  onSearch() {
    this.filterProduct = this.Product.filter((pro) => {
      return pro.id === this.ProductId;
    });
    this.isDialogOpen = false;
    this.ProductId = 0;
  }
  refresh() {
    this.filterProduct = this.Product;
  }
  delbyId() {
    let cond = this.Product.find((product, index) => {
      if (this.ProductId == product.id) {
        this.Product.splice(index, 1);
        return 1;
      } else {
        return 0;
      }
    });
    this.ProductId = 0;
    this.filterProduct = this.Product;
    this.IddelDialog = false;
    if (cond) {
      alert('record deleted successfully');
    } else {
      alert('no Item found');
    }
  }
  delbyName() {
    let cond = this.Product.find((product, index) => {
      if (this.ProductName.toLowerCase() === product.name.toLowerCase()) {
        this.Product.splice(index, 1);
        return 1;
      } else {
        return 0;
      }
    });
    this.ProductName = '';
    this.filterProduct = this.Product;
    this.NameDialog = false;
    if (cond) {
      alert('record deleted successfully');
    } else {
      alert('no Item found');
    }
  }
  Maxprice() {
    this.filterProduct = this.Product.filter((pro) => {
      return pro.Price <= this.MaxPrice;
    });
    this.MaxDialog = false;
    this.MaxPrice = 0;
  }
  getbyVen() {
    const ven = this.vendor.find(
      (ven) => ven.name.toLowerCase() === this.VenName.toLowerCase()
    );
    if (ven) {
      this.filterProduct = this.Product.filter(
        (pro) => parseInt(pro.VendorId) === ven.id
      );
      this.VenName = '';
      this.VendorDialog = false;
      if (this.filterProduct.length < 0) {
        alert('No item found');
      }
    } else {
      alert('Vendor not found');
    }
  }
  getbyCat() {
    const cat = this.Category.find(
      (cat) => cat.name.toLowerCase() === this.CatName.toLowerCase()
    );
    if (cat) {
      this.filterProduct = this.Product.filter(
        (pro) => parseInt(pro.CategoryId) === cat.id
      );
      this.CatName = '';
      this.CategoryDialog = false;
      if (this.filterProduct.length < 0) {
        alert('No item found');
      }
    } else {
      alert('Category not found');
    }
  }
}
