function GoToQuiz( quizId, isUserAuthorized ) {
	if( true ) {
		DoGoToQuiz( quizId );
	} else  {
		var authResult = AuthorizeUser( quizId );
		
		authResult.Register( function( authOk ) {
				if( authOk ) {
					DoGoToQuiz( quizId );
				}
			}
		);	
	}
}

function DoGoToQuiz( quizId ) {
	var ni = new D2L.NavInfo();
	ni.navigation = '/d2l/lms/quizzing/user/quiz_summary.d2l';
	ni.SetParam( 'qi', quizId );				
	Nav.Go( ni );
}
