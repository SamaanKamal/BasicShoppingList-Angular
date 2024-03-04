import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorgeService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscripton: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorgeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscripton = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscripton.unsubscribe();
  }
}
