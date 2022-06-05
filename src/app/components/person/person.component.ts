import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, mergeMap, of, Subject, SubscriptionLike, take, tap } from 'rxjs';
import { PersonProfile, PersonService } from './service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [PersonService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit, OnDestroy {
  private trigger$: Subject<void> = new Subject<void>();
  private subscription$?: SubscriptionLike;
  public profile?: PersonProfile | null;
  public isMatch = false;
  public loading = false;
  public photoLoading = false;

  constructor(private cdr: ChangeDetectorRef, private person: PersonService) {
    this.subscription$ = this.trigger$
      .asObservable()
      .pipe(
        tap(() => {
          this.isMatch = false;
          this.loading = true;
          this.photoLoading = true;
          this.cdr.markForCheck();
        }),
        mergeMap(() => this.person.getPersonProfile()),
        catchError(() => of(null))
      )
      .subscribe((profile: PersonProfile | null) => {
        this.profile = profile;
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.trigger$.next();
  }

  ngOnDestroy(): void {
    if (!!this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  public onLoadedPhoto(event: Event): void {
    this.photoLoading = false;
    this.cdr.markForCheck();
  }

  public onLike(event: Event): void {
    this.person
      .likePersonProfile(Math.floor(Math.random() * 10))
      .pipe(take(1))
      .subscribe((isMatch: boolean) => {
        this.isMatch = isMatch;
        if (!this.isMatch) {
          this.trigger$.next();
        } else {
          this.cdr.markForCheck();
        }
      });
  }

  public onDislike(event: Event): void {
    this.trigger$.next();
  }

  public onOkay(event: Event): void {
    this.isMatch = false;
    this.cdr.markForCheck();
  }
}
