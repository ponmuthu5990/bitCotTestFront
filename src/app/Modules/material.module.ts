import { NgModule } from '@angular/core';
import { MatTooltipModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, 
    MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, 
    MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, 
    MatRadioModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';

    

@NgModule({
    imports: [ MatTooltipModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, 
        MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, 
        MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, 
        MatRadioModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule ],

    exports: [ MatTooltipModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, 
        MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, 
        MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, 
        MatRadioModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule ],
})

export class MaterialModule { }