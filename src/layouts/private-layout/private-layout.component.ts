import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink, FooterComponent],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss'
})

export class PrivateLayoutComponent {

  authService = inject(AuthService);
}