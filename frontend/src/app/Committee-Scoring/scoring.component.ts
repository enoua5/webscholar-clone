import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-scoring',
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.less']
})
export class ScoringComponent implements OnInit {
  public scholarId: any;
  public currentScore: any;

  constructor(
    private _Activatedroute: ActivatedRoute,
    public authService: AuthService
  ) {


  }

  ngOnInit(): void {
    this.scholarId = this._Activatedroute.snapshot.paramMap.get("scholarId");
    this.scholarId = this.scholarId as number
    this.currentScore = this._Activatedroute.snapshot.paramMap.get("score");
    this.currentScore = this.currentScore as number;

    // First get the info about the application and the user that submitted the application
    // Highlight the button of the current score
  }

  scoreApp(score): void {
    // When user selects a score it will check to see if that is already the current score to cut back on pointless api calls.
    // If the score is new it will make an api call to save that new score.
    if (this.currentScore != score) {
      console.log(score);
      this.currentScore = score;
    }

  }
}
